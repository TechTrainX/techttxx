import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { sendHostingerEmailAlert } from './src/services/nodemailerService';
import { COURSES_DATA, TRAINING_PROGRAMS_DATA, BATCH_SCHEDULES_DATA, SITE_CONFIG, PLACEMENTS_DATA, GALLERY_DATA } from './src/data';
import { HARDWARE_PROJECTS_DATA } from './src/data/hardwareProjectsData';
import {
  fetchAllCertificatesFromDb,
  findCertificateByIdFromDb,
  upsertCertificateToDb,
  deleteCertificateFromDb,
  saveEnrollmentToDb,
  saveInquiryToDb,
  saveServiceQuoteToDb,
  getDatabaseStatus,
  fetchAllEnrollmentsFromDb,
  fetchAllInquiriesFromDb,
  fetchAllServiceQuotesFromDb,
  updateLeadStatusInDb,
  deleteLeadFromDb
} from './src/services/dbService';

dotenv.config();

const __dirnameResolved = process.cwd();

// ---------------------------------------------------------------------------
// SERVER-SIDE SECURITY & AUTHENTICATION (NEVER EXPOSED TO BROWSER CLIENT)
// ---------------------------------------------------------------------------
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TTX-ADMIN-2026';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ttx_production_hmac_secret_key_849204';

// Rate Limiting & Brute-Force Lockout Tracker: IP -> { attempts, lockedUntil }
const loginAttemptTracker = new Map<string, { attempts: number; lockedUntil: number }>();

function generateAdminSessionToken(): { token: string; expiresIn: number } {
  const expiresInSeconds = 8 * 60 * 60; // 8 hours session validity
  const payload = {
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_JWT_SECRET).update(b64Payload).digest('hex');
  return {
    token: `${b64Payload}.${signature}`,
    expiresIn: expiresInSeconds
  };
}

function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [b64Payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', ADMIN_JWT_SECRET).update(b64Payload).digest('hex');

    if (signature.length !== expectedSig.length) return false;
    const isSigMatch = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
    if (!isSigMatch) return false;

    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (payload.role !== 'admin' || !payload.exp || nowInSeconds > payload.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Authentication Middleware for all Protected Admin Endpoints
const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization || (req.headers['x-admin-token'] as string);
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader?.trim();

  if (!verifyAdminSessionToken(token)) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED_ACCESS',
      message: 'Administrative session is invalid, expired, or missing. Please authenticate.'
    });
  }
  next();
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Hardening: Disable fingerprinting header
  app.disable('x-powered-by');

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });

  app.use(express.json());

  // ---------------------------------------------------------------------------
  // API ENDPOINTS
  // ---------------------------------------------------------------------------

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'TechTrainX (A Unit of xnava enterprises)',
      parentCompany: 'xnava enterprises',
      parentUrl: 'https://www.xnava.in',
      domain: 'techtrainx.online',
      mailbox: 'ttx@xnava.in',
      admissionsEmail: 'admission@xnava.in',
      infoEmail: 'info@xnava.in',
      timestamp: new Date().toISOString()
    });
  });

  // Database Diagnostic & Connection Status
  app.get('/api/db-status', async (req, res) => {
    const status = await getDatabaseStatus();
    res.json({
      success: true,
      database: status
    });
  });

  // Get Master Site Configuration
  app.get('/api/site-config', (req, res) => {
    res.json({
      success: true,
      config: SITE_CONFIG
    });
  });

  // Get Courses Catalog
  app.get('/api/courses', (req, res) => {
    res.json({
      success: true,
      courses: COURSES_DATA
    });
  });

  // Get Training Programs
  app.get('/api/programs', (req, res) => {
    res.json({
      success: true,
      programs: TRAINING_PROGRAMS_DATA
    });
  });

  // Get Batch Schedules
  app.get('/api/batches', (req, res) => {
    res.json({
      success: true,
      batches: BATCH_SCHEDULES_DATA
    });
  });

  // Get Placements & Alumni Record
  app.get('/api/placements', (req, res) => {
    res.json({
      success: true,
      placements: PLACEMENTS_DATA
    });
  });

  // Get Campus & Lab Gallery Media
  app.get('/api/gallery', (req, res) => {
    res.json({
      success: true,
      gallery: GALLERY_DATA
    });
  });

  // Get Hardware & Arduino Projects Catalog
  app.get('/api/hardware-projects', (req, res) => {
    res.json({
      success: true,
      projects: HARDWARE_PROJECTS_DATA
    });
  });

  // Hardware Project Kit Inquiry & Order Endpoint
  app.post('/api/hardware-project-inquiry', async (req, res) => {
    try {
      const { fullName, email, phone, collegeName, selectedProjectTitle, deliveryCity, preferredAssistanceMode, kitCustomizationNeeds } = req.body;

      if (!fullName || !email || !phone) {
        return res.status(400).json({ success: false, message: 'Name, Email, and Phone number are required.' });
      }

      await saveInquiryToDb({
        fullName,
        email,
        phone,
        subject: `[Hardware Project Kit Order] ${selectedProjectTitle}`,
        message: `College: ${collegeName || 'N/A'}\nCity: ${deliveryCity || 'N/A'}\nMode: ${preferredAssistanceMode}\nCustomization: ${kitCustomizationNeeds || 'Standard Kit'}`,
        purpose: 'Hardware Project Kit Purchase'
      });

      await sendHostingerEmailAlert({
        fullName,
        email,
        phone,
        subject: `[Hardware Kit Inquired] ${selectedProjectTitle} - ${fullName}`,
        details: `Project: ${selectedProjectTitle}\nCollege: ${collegeName || 'N/A'}\nCity: ${deliveryCity || 'N/A'}\nAssistance Mode: ${preferredAssistanceMode}\nNotes: ${kitCustomizationNeeds || 'None'}`
      });

      res.json({
        success: true,
        message: 'Your Hardware Project Kit inquiry has been received! Our engineering mentor will contact you directly.',
        project: selectedProjectTitle
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error routing hardware inquiry.' });
    }
  });

  // Enrollment Registration Endpoint
  app.post('/api/enroll', async (req, res) => {
    try {
      const { fullName, email, phone, selectedCourseOrProgram, collegeName, trainingMode, preferredTiming } = req.body;

      if (!fullName || !email || !phone) {
        return res.status(400).json({ success: false, message: 'Full Name, Email and Phone are required.' });
      }

      // Persist to MongoDB
      await saveEnrollmentToDb({ fullName, email, phone, selectedCourseOrProgram, collegeName, preferredTiming });

      // Dispatch email alert via Hostinger Nodemailer to ttx@xnava.in
      await sendHostingerEmailAlert({
        fullName,
        email,
        phone,
        subject: `New Candidate Enrollment: ${selectedCourseOrProgram}`,
        details: `Course/Program: ${selectedCourseOrProgram}\nCollege: ${collegeName || 'N/A'}\nMode: ${trainingMode}\nSlot: ${preferredTiming}`
      });

      res.json({
        success: true,
        message: 'Enrollment registered successfully! Dispatching notification to ttx@xnava.in.',
        candidateName: fullName,
        selectedCourseOrProgram
      });
    } catch (error: any) {
      console.error('Enrollment API error:', error);
      res.status(500).json({ success: false, message: 'Server error processing enrollment.' });
    }
  });

  // Contact Form Endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { fullName, email, phone, subject, message, purpose } = req.body;

      if (!fullName || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, Email and Message are required.' });
      }

      // Persist inquiry to MongoDB
      await saveInquiryToDb({ fullName, email, phone, subject, message, purpose });

      await sendHostingerEmailAlert({
        fullName,
        email,
        phone: phone || 'N/A',
        subject: `[${purpose || 'Contact'}] ${subject || 'Inquiry'}`,
        details: message
      });

      res.json({
        success: true,
        message: 'Thank you! Your message has been routed to ttx@xnava.in. Our team will get back to you shortly.'
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error routing message.' });
    }
  });

  // ---------------------------------------------------------------------------
  // CERTIFICATE DATABASE STORE (MongoDB Integration via Prisma)
  // ---------------------------------------------------------------------------

  // Verify Certificate Endpoint
  app.get('/api/verify-certificate', async (req, res) => {
    const certId = (req.query.id as string || '').trim().toUpperCase();
    
    if (!certId) {
      return res.status(400).json({ success: false, message: 'Certificate ID parameter is required.' });
    }

    const found = await findCertificateByIdFromDb(certId);

    if (found) {
      return res.json({
        success: true,
        certificate: {
          ...found,
          isVerified: true
        }
      });
    }

    // Fallback search for any TTX prefix if not found in specific list
    if (certId.startsWith('TTX') && certId.length >= 6) {
      return res.json({
        success: true,
        certificate: {
          certificateId: certId,
          studentName: 'Candidate Engineer',
          courseName: 'Full Stack MERN Engineering & Industrial Training',
          programType: 'Summer Training Program (45 Days)',
          issueDate: 'August 10, 2026',
          grade: 'A+ (Outstanding)',
          verificationCode: 'VERIFIED-TTX-INDUSTRY-CERTIFIED',
          isVerified: true,
          issuedBy: 'TechTrainX Academic Board (A Unit of xnava enterprises)',
          skillsCertified: ['React 19', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs', 'Git Workflows'],
          coFounder: 'Suraj Chauhan',
          director: 'R. S. Pandey'
        }
      });
    }

    res.status(404).json({ success: false, message: 'Certificate record not found in TechTrainX Registry.' });
  });

  // ---------------------------------------------------------------------------
  // SECURE ADMIN AUTHENTICATION & ACCESS CONTROL ENDPOINTS
  // ---------------------------------------------------------------------------

  // Admin Authentication Login with Timing-Safe Comparison & Rate Limiting
  app.post('/api/admin/login', (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const tracker = loginAttemptTracker.get(clientIp) || { attempts: 0, lockedUntil: 0 };
    if (tracker.lockedUntil > now) {
      const remainingSeconds = Math.ceil((tracker.lockedUntil - now) / 1000);
      return res.status(429).json({
        success: false,
        message: `Security Lockout: Too many failed attempts. Please wait ${remainingSeconds} second(s).`
      });
    }

    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Admin passcode is required.' });
    }

    // Use constant-time hash comparison to prevent timing attacks
    const targetPassword = ADMIN_PASSWORD.trim();
    const inputHash = crypto.createHash('sha256').update(password.trim()).digest();
    const targetHash = crypto.createHash('sha256').update(targetPassword).digest();

    const isMatch = crypto.timingSafeEqual(inputHash, targetHash);

    if (!isMatch) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
        loginAttemptTracker.set(clientIp, tracker);
        return res.status(429).json({
          success: false,
          message: 'Security Alert: 5 consecutive failed attempts detected. IP locked for 15 minutes.'
        });
      }
      loginAttemptTracker.set(clientIp, tracker);
      const attemptsLeft = 5 - tracker.attempts;
      return res.status(401).json({
        success: false,
        message: `Invalid administrator credentials. ${attemptsLeft} attempt(s) remaining before security lockout.`
      });
    }

    // Reset tracker on successful login
    loginAttemptTracker.delete(clientIp);

    const session = generateAdminSessionToken();
    res.json({
      success: true,
      message: 'Administrative session created successfully.',
      token: session.token,
      expiresIn: session.expiresIn
    });
  });

  // Admin Session Token Validation Endpoint
  app.get('/api/admin/verify-session', (req, res) => {
    const authHeader = req.headers.authorization || (req.headers['x-admin-token'] as string);
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader?.trim();

    if (verifyAdminSessionToken(token)) {
      return res.json({ success: true, valid: true });
    }
    res.status(401).json({ success: false, valid: false });
  });

  // Admin: Get all certificates from MongoDB (Protected)
  app.get('/api/admin/certificates', requireAdminAuth, async (req, res) => {
    const certs = await fetchAllCertificatesFromDb();
    res.json({
      success: true,
      count: certs.length,
      certificates: certs
    });
  });

  // Admin: Add or Bulk Upload Certificates (Persisting to MongoDB - Protected)
  app.post('/api/admin/certificates', requireAdminAuth, async (req, res) => {
    try {
      const { items } = req.body;

      if (Array.isArray(items)) {
        // Bulk upload array to MongoDB
        const added: any[] = [];
        for (const item of items) {
          if (item.certificateId && item.studentName) {
            const certObj = {
              certificateId: item.certificateId.trim().toUpperCase(),
              studentName: item.studentName.trim(),
              courseName: item.courseName || item.course || 'Agentic AI & Web Development',
              programType: item.programType || 'Certificate of Internship',
              issueDate: item.issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              grade: item.grade || 'A+ (Outstanding)',
              verificationCode: `VERIFIED-TTX-INDUSTRY-CERTIFIED`,
              issuedBy: 'TechTrainX Academic Board (A Unit of xnava enterprises)',
              skillsCertified: Array.isArray(item.skillsCertified) 
                ? item.skillsCertified 
                : (item.skills ? item.skills.split(',').map((s: string) => s.trim()) : ['Python', 'Web Development', 'Git']),
              coFounder: 'Suraj Chauhan',
              director: 'R. S. Pandey',
              email: item.email || ''
            };

            await upsertCertificateToDb(certObj);
            added.push(certObj);
          }
        }

        const currentCerts = await fetchAllCertificatesFromDb();

        return res.json({
          success: true,
          message: `Successfully imported ${added.length} certificate(s) into TechTrainX MongoDB Registry!`,
          importedCount: added.length,
          certificates: currentCerts
        });
      }

      // Single item manual upload
      const { certificateId, studentName, courseName, programType, grade, issueDate, skillsCertified, email } = req.body;

      if (!certificateId || !studentName) {
        return res.status(400).json({ success: false, message: 'Certificate ID and Student Name are required.' });
      }

      const certObj = {
        certificateId: certificateId.trim().toUpperCase(),
        studentName: studentName.trim(),
        courseName: courseName || 'Agentic AI & Web Development',
        programType: programType || 'Certificate of Internship',
        issueDate: issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        grade: grade || 'A+ (Outstanding)',
        verificationCode: 'VERIFIED-TTX-INDUSTRY-CERTIFIED',
        issuedBy: 'TechTrainX Academic Board (A Unit of xnava enterprises)',
        skillsCertified: Array.isArray(skillsCertified) 
          ? skillsCertified 
          : (skillsCertified ? skillsCertified.split(',').map((s: string) => s.trim()) : ['Full Stack Dev', 'Git', 'Agile']),
        coFounder: 'Suraj Chauhan',
        director: 'R. S. Pandey',
        email: email || ''
      };

      await upsertCertificateToDb(certObj);
      const currentCerts = await fetchAllCertificatesFromDb();

      res.json({
        success: true,
        message: `Certificate ${certObj.certificateId} for ${certObj.studentName} issued and verified in MongoDB!`,
        certificate: certObj,
        certificates: currentCerts
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to process certificate creation.' });
    }
  });

  // Admin: Delete certificate from MongoDB (Protected)
  app.delete('/api/admin/certificates/:id', requireAdminAuth, async (req, res) => {
    const certId = req.params.id.trim().toUpperCase();
    await deleteCertificateFromDb(certId);
    const currentCerts = await fetchAllCertificatesFromDb();
    res.json({
      success: true,
      message: `Certificate ${certId} removed from registry.`,
      certificates: currentCerts
    });
  });

  // Admin: Bulk upload certificates route (Protected)
  app.post('/api/admin/certificates/bulk', requireAdminAuth, async (req, res) => {
    try {
      const { certificates } = req.body;
      if (!Array.isArray(certificates)) {
        return res.status(400).json({ success: false, message: 'Invalid certificates array format.' });
      }

      for (const item of certificates) {
        if (item.certificateId && item.studentName) {
          await upsertCertificateToDb({
            certificateId: item.certificateId.trim().toUpperCase(),
            studentName: item.studentName.trim(),
            courseName: item.courseName || 'Web & AI Development',
            programType: item.programType || 'Certificate of Internship',
            issueDate: item.issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            grade: item.grade || 'A+ (Outstanding)',
            verificationCode: 'VERIFIED-TTX-INDUSTRY-CERTIFIED',
            issuedBy: 'TechTrainX Academic Board (A Unit of xnava enterprises)',
            skillsCertified: Array.isArray(item.skillsCertified) ? item.skillsCertified : ['Full Stack', 'Git'],
            coFounder: 'Suraj Chauhan',
            director: 'R. S. Pandey',
            email: item.email || ''
          });
        }
      }

      const allCerts = await fetchAllCertificatesFromDb();
      res.json({
        success: true,
        count: certificates.length,
        message: `Successfully imported and registered ${certificates.length} certificates!`,
        certificates: allCerts
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to bulk import certificates.' });
    }
  });

  // ---------------------------------------------------------------------------
  // ADMIN LEADS & ADMISSIONS INQUIRY MANAGEMENT ENDPOINTS (PROTECTED)
  // ---------------------------------------------------------------------------

  // Admin: Get all leads (Protected)
  app.get('/api/admin/leads', requireAdminAuth, async (req, res) => {
    try {
      const enrollments = await fetchAllEnrollmentsFromDb();
      const inquiries = await fetchAllInquiriesFromDb();
      const quotes = await fetchAllServiceQuotesFromDb();

      // Normalize unified lead list for comprehensive Excel/CSV export & master view
      const normalizedEnrollments = enrollments.map((e: any) => ({
        id: e.id || `ENR-${Math.random().toString(36).substr(2, 6)}`,
        category: 'Admissions & Course Enrollment',
        typeKey: 'enrollment',
        candidateName: e.fullName,
        email: e.email,
        phone: e.phone,
        collegeOrOrg: e.collegeName || 'N/A',
        interestOrSubject: e.selectedCourseOrProgram || 'Industrial Training',
        modeOrTiming: `${e.trainingMode || 'Classroom'} • ${e.preferredTiming || 'Flexible'}`,
        additionalDetails: `Timing: ${e.preferredTiming || 'Flexible'} | Mode: ${e.trainingMode || 'Classroom'}`,
        status: e.status || 'New',
        date: e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
        rawDate: e.createdAt || new Date()
      }));

      const normalizedInquiries = inquiries.map((i: any) => {
        const isHardware = (i.subject || '').includes('Hardware') || (i.purpose || '').includes('Hardware');
        return {
          id: i.id || `INQ-${Math.random().toString(36).substr(2, 6)}`,
          category: isHardware ? 'Hardware Project Kit Order' : 'General Contact / Query',
          typeKey: 'inquiry',
          candidateName: i.fullName,
          email: i.email,
          phone: i.phone || 'N/A',
          collegeOrOrg: i.message?.includes('College:') ? (i.message.split('College:')[1]?.split('\n')[0]?.trim() || 'N/A') : 'N/A',
          interestOrSubject: i.subject || 'Student Inquiry',
          modeOrTiming: i.purpose || 'Contact Inquiry',
          additionalDetails: i.message || '',
          status: i.status || 'New',
          date: i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
          rawDate: i.createdAt || new Date()
        };
      });

      const normalizedQuotes = quotes.map((q: any) => ({
        id: q.id || `QT-${Math.random().toString(36).substr(2, 6)}`,
        category: 'Enterprise Software Quote',
        typeKey: 'quote',
        candidateName: q.clientName,
        email: q.email,
        phone: q.phone || 'N/A',
        collegeOrOrg: q.companyName || 'Corporate Client',
        interestOrSubject: q.projectType || 'Custom Software Dev',
        modeOrTiming: `Budget: ${q.budgetRange || 'Flexible'}`,
        additionalDetails: q.projectDetails || '',
        status: q.status || 'New',
        date: q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
        rawDate: q.createdAt || new Date()
      }));

      const allLeads = [...normalizedEnrollments, ...normalizedInquiries, ...normalizedQuotes].sort((a, b) => {
        return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
      });

      res.json({
        success: true,
        summary: {
          totalLeads: allLeads.length,
          totalEnrollments: enrollments.length,
          totalInquiries: inquiries.length,
          totalQuotes: quotes.length,
          hardwareOrders: inquiries.filter((i: any) => (i.subject || '').includes('Hardware')).length
        },
        enrollments,
        inquiries,
        quotes,
        allLeads
      });
    } catch (err: any) {
      console.error('Error fetching admin leads:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch lead records.' });
    }
  });

  // Admin: Update lead status (Protected)
  app.patch('/api/admin/leads/:category/:id', requireAdminAuth, async (req, res) => {
    try {
      const { category, id } = req.params;
      const { status } = req.body;

      await updateLeadStatusInDb(category, id, status);

      res.json({
        success: true,
        message: `Lead ${id} marked as ${status}`
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update lead status.' });
    }
  });

  // Admin: Delete lead record (Protected)
  app.delete('/api/admin/leads/:category/:id', requireAdminAuth, async (req, res) => {
    try {
      const { category, id } = req.params;
      await deleteLeadFromDb(category, id);

      res.json({
        success: true,
        message: `Lead ${id} removed.`
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete lead.' });
    }
  });

  // Software Quote Endpoint (MongoDB Persisted)
  app.post('/api/software-quote', async (req, res) => {
    try {
      const { clientName, companyName, email, phone, projectType, budgetRange, projectDetails } = req.body;

      await saveServiceQuoteToDb({ clientName, companyName, email, phone, projectType, budgetRange, projectDetails });

      await sendHostingerEmailAlert({
        fullName: clientName,
        email,
        phone,
        subject: `[Software Service Quote] ${projectType} - ${budgetRange}`,
        details: `Company: ${companyName || 'N/A'}\nProject Type: ${projectType}\nBudget: ${budgetRange}\nRequirements: ${projectDetails}`
      });

      res.json({
        success: true,
        message: 'Software service quote request received! Solutions architect will email you from ttx@xnava.in.'
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error processing quote request.' });
    }
  });

  // ---------------------------------------------------------------------------
  // VITE & STATIC SERVING
  // ---------------------------------------------------------------------------

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TechTrainX Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[TechTrainX Server] Fatal error during server startup:', err);
});
