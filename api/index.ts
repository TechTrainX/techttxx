import { 
  COURSES_DATA, 
  TRAINING_PROGRAMS_DATA, 
  BATCH_SCHEDULES_DATA, 
  SITE_CONFIG, 
  PLACEMENTS_DATA, 
  GALLERY_DATA,
  FRONTIER_TECH_ROADMAPS_DATA
} from '../src/data';
import {
  findCertificateByIdFromDb,
  saveEnrollmentToDb,
  saveInquiryToDb,
  saveServiceQuoteToDb,
  getDatabaseStatus
} from '../src/services/dbService';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';

  try {
    if (url.includes('/api/health')) {
      return res.status(200).json({ status: 'ok', service: 'TechTrainX API' });
    }

    if (url.includes('/api/db-status')) {
      const dbStatus = await getDatabaseStatus();
      return res.status(200).json({ success: true, database: dbStatus });
    }

    if (url.includes('/api/site-config')) {
      return res.status(200).json({ success: true, config: SITE_CONFIG });
    }

    if (url.includes('/api/courses')) {
      return res.status(200).json({ success: true, courses: COURSES_DATA });
    }

    if (url.includes('/api/roadmaps')) {
      return res.status(200).json({ success: true, roadmaps: FRONTIER_TECH_ROADMAPS_DATA });
    }

    if (url.includes('/api/programs')) {
      return res.status(200).json({ success: true, programs: TRAINING_PROGRAMS_DATA });
    }

    if (url.includes('/api/batches')) {
      return res.status(200).json({ success: true, batches: BATCH_SCHEDULES_DATA });
    }

    if (url.includes('/api/placements')) {
      return res.status(200).json({ success: true, placements: PLACEMENTS_DATA });
    }

    if (url.includes('/api/gallery')) {
      return res.status(200).json({ success: true, gallery: GALLERY_DATA });
    }

    if (url.includes('/api/verify-certificate')) {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const certId = parsedUrl.searchParams.get('id') || '';
      if (!certId) {
        return res.status(400).json({ success: false, message: 'Certificate ID is required' });
      }
      const cert = await findCertificateByIdFromDb(certId);
      if (!cert) {
        return res.status(404).json({ success: false, message: 'Certificate not found in registrar database' });
      }
      return res.status(200).json({ success: true, certificate: cert });
    }

    if (url.includes('/api/enroll') && req.method === 'POST') {
      const body = req.body || {};
      await saveEnrollmentToDb(body);
      const studentName = body.fullName || 'Student';
      const courseName = body.selectedCourseOrProgram || 'Full Stack Program';
      const whatsAppMessage = `Hello TechTrainX Team, I (${studentName}) have submitted my registration for ${courseName}. Phone: ${body.phone || 'N/A'}. Please share batch schedule and fee structure!`;
      const whatsappUrl = `https://wa.me/918545092070?text=${encodeURIComponent(whatsAppMessage)}`;
      return res.status(200).json({
        success: true,
        message: 'Enrollment registered successfully!',
        whatsappUrl
      });
    }

    if (url.includes('/api/contact') && req.method === 'POST') {
      const body = req.body || {};
      await saveInquiryToDb(body);
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your inquiry has been routed to info@xnava.in.'
      });
    }

    if (url.includes('/api/software-quote') && req.method === 'POST') {
      const body = req.body || {};
      await saveServiceQuoteToDb(body);
      return res.status(200).json({
        success: true,
        message: 'Software service quote received! TechTrainX team will contact you shortly.'
      });
    }

    // Default fallback
    return res.status(200).json({
      status: 'active',
      platform: 'TechTrainX Enterprise API',
      parentCompany: 'xnava enterprises'
    });
  } catch (error: any) {
    console.error('Vercel API error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}





