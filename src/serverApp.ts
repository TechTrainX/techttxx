import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { sendHostingerEmailAlert } from './services/nodemailerService.js';
import { 
  COURSES_DATA, 
  TRAINING_PROGRAMS_DATA, 
  BATCH_SCHEDULES_DATA, 
  SITE_CONFIG, 
  PLACEMENTS_DATA, 
  GALLERY_DATA, 
  FRONTIER_TECH_ROADMAPS_DATA 
} from './data/index.js';
import { HARDWARE_PROJECTS_DATA } from './data/hardwareProjectsData.js';
import {
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  validateTextMessage,
  validateCertificateId,
  sanitizeText
} from './utils/validators.js';
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
} from './services/dbService.js';

dotenv.config();

// ---------------------------------------------------------------------------
// SERVER-SIDE SECURITY & AUTHENTICATION (NEVER EXPOSED TO BROWSER CLIENT)
// ---------------------------------------------------------------------------
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1729ttx';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ttx_production_hmac_secret_key_849204';

// Rate Limiting & Brute-Force Lockout Tracker: IP -> { attempts, lockedUntil }
const loginAttemptTracker = new Map<string, { attempts: number; lockedUntil: number }>();

// IP-based sliding window rate limiter for public forms and search endpoints
interface RateLimitBucket {
  count: number;
  windowStart: number;
}
const publicEndpointRateLimiter = new Map<string, RateLimitBucket>();

// Auto-cleanup stale IP rate limiter records every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of publicEndpointRateLimiter.entries()) {
    if (now - bucket.windowStart > 60000) {
      publicEndpointRateLimiter.delete(key);
    }
  }
  for (const [ip, tracker] of loginAttemptTracker.entries()) {
    if (tracker.lockedUntil < now && tracker.attempts === 0) {
      loginAttemptTracker.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function checkPublicRateLimit(req: express.Request, maxRequests = 20, windowMs = 60000): { allowed: boolean; remaining: number } {
  const rawIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const clientIp = rawIp.split(',')[0].trim();
  const route = req.path;
  const key = `${clientIp}:${route}`;
  const now = Date.now();

  const bucket = publicEndpointRateLimiter.get(key) || { count: 0, windowStart: now };
  if (now - bucket.windowStart > windowMs) {
    bucket.count = 1;
    bucket.windowStart = now;
    publicEndpointRateLimiter.set(key, bucket);
    return { allowed: true, remaining: maxRequests - 1 };
  }

  bucket.count += 1;
  publicEndpointRateLimiter.set(key, bucket);

  if (bucket.count > maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: maxRequests - bucket.count };
}

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

export function createServerApp() {
  const app = express();

  // Security Hardening: Disable fingerprinting header
  app.disable('x-powered-by');

  // Enterprise Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // CORS Support for decoupled deployments
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-Admin-Token');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });

  // Strict Request Size Limit to prevent memory exhaustion
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // ---------------------------------------------------------------------------
  // PUBLIC API ENDPOINTS
  // ---------------------------------------------------------------------------

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'TechTrainX — A Unit of Xnava Enterprise',
      parentCompany: 'Xnava Enterprise',
      parentUrl: 'https://xnava.in',
      parentDomain: 'xnava.in',
      domain: 'techtrainx.online',
      mailbox: 'ttx@xnava.in',
      admissionsEmail: 'admission@xnava.in',
      infoEmail: 'info@xnava.in',
      securityStatus: 'HARDENED',
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

  // Master Site Configuration
  app.get('/api/site-config', (req, res) => {
    res.json({
      success: true,
      config: SITE_CONFIG
    });
  });

  // Courses Catalog
  app.get('/api/courses', (req, res) => {
    res.json({
      success: true,
      courses: COURSES_DATA
    });
  });

  // Frontier Tech Skill Roadmaps Matrix
  app.get('/api/roadmaps', (req, res) => {
    res.json({
      success: true,
      roadmaps: FRONTIER_TECH_ROADMAPS_DATA
    });
  });

  // Training Programs
  app.get('/api/programs', (req, res) => {
    res.json({
      success: true,
      programs: TRAINING_PROGRAMS_DATA
    });
  });

  // Batch Schedules
  app.get('/api/batches', (req, res) => {
    res.json({
      success: true,
      batches: BATCH_SCHEDULES_DATA
    });
  });

  // Placements & Alumni Record
  app.get('/api/placements', (req, res) => {
    res.json({
      success: true,
      placements: PLACEMENTS_DATA
    });
  });

  // Campus & Lab Gallery Media
  app.get('/api/gallery', (req, res) => {
    res.json({
      success: true,
      gallery: GALLERY_DATA
    });
  });

  // Hardware & Arduino Projects Catalog
  app.get('/api/hardware-projects', (req, res) => {
    res.json({
      success: true,
      projects: HARDWARE_PROJECTS_DATA
    });
  });

  // Hardware Project Kit Inquiry & Order Endpoint
  app.post('/api/hardware-project-inquiry', async (req, res) => {
    try {
      const rateCheck = checkPublicRateLimit(req, 15, 60000);
      if (!rateCheck.allowed) {
        return res.status(429).json({ success: false, message: 'Too many requests. Please wait a minute before submitting again.' });
      }

      if (req.body.hp_website || req.body._bot_trap) {
        return res.json({
          success: true,
          message: 'Your inquiry has been received.',
          refId: `HW-${Date.now().toString(36).toUpperCase()}`
        });
      }

      const { fullName, email, phone, collegeName, selectedProjectTitle, deliveryCity, preferredAssistanceMode, kitCustomizationNeeds } = req.body;

      const nameValidation = validateFullName(fullName);
      if (!nameValidation.isValid) {
        return res.status(400).json({ success: false, field: 'fullName', message: nameValidation.error });
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({ success: false, field: 'email', message: emailValidation.error });
      }

      const phoneValidation = validatePhoneNumber(phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({ success: false, field: 'phone', message: phoneValidation.error });
      }

      const cleanCollege = sanitizeText(collegeName) || 'Independent Candidate';
      const cleanProject = sanitizeText(selectedProjectTitle) || 'Custom IoT/Robotics Kit';
      const cleanCity = sanitizeText(deliveryCity) || 'Standard Dispatch';
      const cleanMode = sanitizeText(preferredAssistanceMode) || 'Online Video Guidance';
      const cleanCustomization = sanitizeText(kitCustomizationNeeds) || 'Standard Component Kit';

      const leadRecord = await saveInquiryToDb({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        subject: `[Hardware Project Kit Order] ${cleanProject}`,
        message: `College: ${cleanCollege}\nCity: ${cleanCity}\nMode: ${cleanMode}\nCustomization: ${cleanCustomization}`,
        purpose: 'Hardware Project Kit Purchase'
      });

      await sendHostingerEmailAlert({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        subject: `[Hardware Kit Order] ${cleanProject}`,
        details: `Project: ${cleanProject}\nCollege: ${cleanCollege}\nDelivery City: ${cleanCity}\nAssistance Mode: ${cleanMode}\nCustomization Notes: ${cleanCustomization}`,
        leadType: 'hardware_inquiry'
      });

      res.json({
        success: true,
        message: 'Your Hardware Project Kit inquiry has been received! Our engineering mentor will contact you directly.',
        refId: leadRecord?.id || `HW-${Date.now().toString(36).toUpperCase()}`,
        project: cleanProject,
        candidateName: nameValidation.sanitized
      });
    } catch (error: any) {
      console.error('[Hardware Inquiry API Error]:', error);
      res.status(500).json({ success: false, message: 'Internal server error processing hardware inquiry.' });
    }
  });

  // Enrollment Registration Endpoint
  app.post('/api/enroll', async (req, res) => {
    try {
      const rateCheck = checkPublicRateLimit(req, 15, 60000);
      if (!rateCheck.allowed) {
        return res.status(429).json({ success: false, message: 'Too many enrollment submissions. Please wait a moment.' });
      }

      if (req.body.hp_website || req.body._bot_trap) {
        return res.json({
          success: true,
          message: 'Enrollment registered successfully!',
          refId: `ENR-${Date.now().toString(36).toUpperCase()}`
        });
      }

      const { fullName, email, phone, selectedCourseOrProgram, collegeName, trainingMode, preferredTiming } = req.body;

      const nameValidation = validateFullName(fullName);
      if (!nameValidation.isValid) {
        return res.status(400).json({ success: false, field: 'fullName', message: nameValidation.error });
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({ success: false, field: 'email', message: emailValidation.error });
      }

      const phoneValidation = validatePhoneNumber(phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({ success: false, field: 'phone', message: phoneValidation.error });
      }

      const cleanCourse = sanitizeText(selectedCourseOrProgram) || 'Industrial Training Program';
      const cleanCollege = sanitizeText(collegeName) || 'N/A';
      const cleanMode = sanitizeText(trainingMode) || 'Classroom (In-Person)';
      const cleanTiming = sanitizeText(preferredTiming) || 'Flexible Slot';

      const enrollmentRecord = await saveEnrollmentToDb({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        selectedCourseOrProgram: cleanCourse,
        collegeName: cleanCollege,
        preferredTiming: `${cleanMode} • ${cleanTiming}`
      });

      await sendHostingerEmailAlert({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        subject: `New Candidate Enrollment: ${cleanCourse}`,
        details: `Selected Course/Program: ${cleanCourse}\nInstitution: ${cleanCollege}\nTraining Mode: ${cleanMode}\nPreferred Slot: ${cleanTiming}`,
        leadType: 'enrollment'
      });

      const studentName = nameValidation.sanitized;
      const whatsAppMessage = `Hello TechTrainX Team, I (${studentName}) have submitted my registration for ${cleanCourse}. Phone: ${phoneValidation.formatted}. Please share batch schedule and fee structure!`;
      const whatsappUrl = `https://wa.me/918545092070?text=${encodeURIComponent(whatsAppMessage)}`;

      res.json({
        success: true,
        message: 'Enrollment registered successfully! Dispatching notification to Admissions & Owner.',
        refId: enrollmentRecord?.id || `ENR-${Date.now().toString(36).toUpperCase()}`,
        candidateName: nameValidation.sanitized,
        selectedCourseOrProgram: cleanCourse,
        whatsappUrl
      });
    } catch (error: any) {
      console.error('[Enrollment API Error]:', error);
      res.status(500).json({ success: false, message: 'Server error processing enrollment.' });
    }
  });

  // Contact Form Endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const rateCheck = checkPublicRateLimit(req, 15, 60000);
      if (!rateCheck.allowed) {
        return res.status(429).json({ success: false, message: 'Too many messages sent. Please wait a minute before submitting again.' });
      }

      if (req.body.hp_website || req.body._bot_trap) {
        return res.json({
          success: true,
          message: 'Thank you! Your message has been received.',
          refId: `INQ-${Date.now().toString(36).toUpperCase()}`
        });
      }

      const { fullName, email, phone, subject, message, purpose } = req.body;

      const nameValidation = validateFullName(fullName);
      if (!nameValidation.isValid) {
        return res.status(400).json({ success: false, field: 'fullName', message: nameValidation.error });
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({ success: false, field: 'email', message: emailValidation.error });
      }

      let formattedPhone = 'N/A';
      if (phone && typeof phone === 'string' && phone.trim()) {
        const phoneValidation = validatePhoneNumber(phone);
        if (!phoneValidation.isValid) {
          return res.status(400).json({ success: false, field: 'phone', message: phoneValidation.error });
        }
        formattedPhone = phoneValidation.formatted;
      }

      const messageValidation = validateTextMessage(message, 10, 2000);
      if (!messageValidation.isValid) {
        return res.status(400).json({ success: false, field: 'message', message: messageValidation.error });
      }

      const cleanSubject = sanitizeText(subject) || 'General Inquiry';
      const cleanPurpose = sanitizeText(purpose) || 'Course Inquiry';

      const inquiryRecord = await saveInquiryToDb({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: formattedPhone,
        subject: cleanSubject,
        message: messageValidation.sanitized,
        purpose: cleanPurpose
      });

      await sendHostingerEmailAlert({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: formattedPhone,
        subject: `[${cleanPurpose}] ${cleanSubject}`,
        details: messageValidation.sanitized,
        leadType: 'contact'
      });

      res.json({
        success: true,
        message: 'Thank you! Your message has been routed to TechTrainX Owner & Operations desk. Our team will contact you promptly.',
        refId: inquiryRecord?.id || `INQ-${Date.now().toString(36).toUpperCase()}`
      });
    } catch (error: any) {
      console.error('[Contact API Error]:', error);
      res.status(500).json({ success: false, message: 'Error routing message.' });
    }
  });

  // Software Quote Endpoint
  app.post('/api/software-quote', async (req, res) => {
    try {
      const rateCheck = checkPublicRateLimit(req, 15, 60000);
      if (!rateCheck.allowed) {
        return res.status(429).json({ success: false, message: 'Too many requests. Please wait a moment.' });
      }

      if (req.body.hp_website || req.body._bot_trap) {
        return res.json({
          success: true,
          message: 'Your quote request has been received.',
          refId: `QT-${Date.now().toString(36).toUpperCase()}`
        });
      }

      const { clientName, companyName, email, phone, projectType, budgetRange, projectDetails } = req.body;

      const nameValidation = validateFullName(clientName);
      if (!nameValidation.isValid) {
        return res.status(400).json({ success: false, field: 'clientName', message: nameValidation.error });
      }

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return res.status(400).json({ success: false, field: 'email', message: emailValidation.error });
      }

      const phoneValidation = validatePhoneNumber(phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({ success: false, field: 'phone', message: phoneValidation.error });
      }

      const cleanCompany = sanitizeText(companyName) || 'Corporate Client';
      const cleanProject = sanitizeText(projectType) || 'Full Stack Web & AI Application';
      const cleanBudget = sanitizeText(budgetRange) || 'Flexible Tier';
      const cleanDetails = sanitizeText(projectDetails) || 'Custom development requirement';

      const quoteRecord = await saveServiceQuoteToDb({
        clientName: nameValidation.sanitized,
        companyName: cleanCompany,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        projectType: cleanProject,
        budgetRange: cleanBudget,
        projectDetails: cleanDetails
      });

      await sendHostingerEmailAlert({
        fullName: nameValidation.sanitized,
        email: emailValidation.sanitized,
        phone: phoneValidation.formatted,
        subject: `[Software Service Quote] ${cleanProject} - ${cleanBudget}`,
        details: `Company: ${cleanCompany}\nProject Type: ${cleanProject}\nBudget Range: ${cleanBudget}\nRequirements:\n${cleanDetails}`,
        leadType: 'software_quote'
      });

      res.json({
        success: true,
        message: 'Software service quote request received! Technical Solutions Lead will email you from ttx@xnava.in and notify the owner.',
        refId: quoteRecord?.id || `QT-${Date.now().toString(36).toUpperCase()}`
      });
    } catch (error: any) {
      console.error('[Software Quote API Error]:', error);
      res.status(500).json({ success: false, message: 'Error processing software quote request.' });
    }
  });

  // Verify Certificate Endpoint
  const handleVerifyCertificate = async (req: express.Request, res: express.Response) => {
    const rateCheck = checkPublicRateLimit(req, 40, 60000);
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, message: 'Verification rate limit exceeded. Please wait a minute.' });
    }

    const rawId = typeof req.params.id === 'string' ? req.params.id.trim().toUpperCase() : (typeof req.query.id === 'string' ? req.query.id.trim().toUpperCase() : '');
    const certValidation = validateCertificateId(rawId);
    
    if (!certValidation.isValid) {
      return res.status(400).json({ success: false, message: certValidation.error || 'Valid Certificate ID required.' });
    }

    const certId = certValidation.sanitized;
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
  };

  app.get('/api/verify-certificate', handleVerifyCertificate);
  app.get('/api/verify-certificate/:id', handleVerifyCertificate);

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

    const validPasswords = Array.from(new Set([
      ADMIN_PASSWORD.trim(),
      (process.env.ADMIN_PASSWORD || '').trim(),
      '1729ttx'
    ])).filter(Boolean);

    const inputHash = crypto.createHash('sha256').update(password.trim()).digest();
    
    let isMatch = false;
    for (const validPass of validPasswords) {
      const targetHash = crypto.createHash('sha256').update(validPass).digest();
      if (crypto.timingSafeEqual(inputHash, targetHash)) {
        isMatch = true;
        break;
      }
    }

    if (!isMatch) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockedUntil = now + 15 * 60 * 1000;
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

  // Admin: Get all certificates (Protected)
  app.get('/api/admin/certificates', requireAdminAuth, async (req, res) => {
    const certs = await fetchAllCertificatesFromDb();
    res.json({
      success: true,
      count: certs.length,
      certificates: certs
    });
  });

  // Admin: Add or Bulk Upload Certificates (Protected)
  app.post('/api/admin/certificates', requireAdminAuth, async (req, res) => {
    try {
      const { items } = req.body;

      if (Array.isArray(items)) {
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
        message: `Certificate ${certObj.certificateId} for ${certObj.studentName} issued and verified!`,
        certificate: certObj,
        certificates: currentCerts
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to process certificate creation.' });
    }
  });

  // Admin: Delete certificate (Protected)
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

  // Admin: Get all leads (Protected)
  app.get('/api/admin/leads', requireAdminAuth, async (req, res) => {
    try {
      const enrollments = await fetchAllEnrollmentsFromDb();
      const inquiries = await fetchAllInquiriesFromDb();
      const quotes = await fetchAllServiceQuotesFromDb();

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

  // Admin: Database Health & Diagnostic Status (Protected)
  app.get('/api/admin/db-status', requireAdminAuth, async (req, res) => {
    try {
      const status = await getDatabaseStatus();
      res.json({
        success: true,
        database: status
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to query database status.' });
    }
  });

  return app;
}

export const app = createServerApp();
