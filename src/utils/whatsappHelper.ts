import { COMPANY_CONFIG } from '../config/companyConfig.js';

/**
 * TechTrainX — WhatsApp Deep-Link Generator Utility
 * 
 * Generates custom, context-aware, URL-encoded WhatsApp messages
 * for every specific course, hardware kit, circuit diagram request,
 * batch schedule, mentorship requirement, and admission query.
 * 
 * Official Helpline: +91 8545092070
 */

const WHATSAPP_NUMBER = COMPANY_CONFIG.phone.replace(/[^0-9]/g, '');

export const WHATSAPP_CONFIG = {
  phoneNumber: WHATSAPP_NUMBER,
  formattedPhone: COMPANY_CONFIG.phoneDisplay,
};

/**
 * Creates standard encoded WhatsApp URL
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Pre-generated WhatsApp link for Courses
 */
export function getCourseWhatsAppUrl(course: { title: string; duration?: string; category?: string }): string {
  const msg = `👋 Hello TechTrainX Team,

I am interested in enrolling for the *${course.title}* training course${course.duration ? ` (Duration: ${course.duration})` : ''}.

📌 *Reason for Contact*: Course syllabus, batch dates, lab timings, fee structure & discount inquiries.
🎓 *My Profile*: Engineering / Diploma student seeking practical coding training.

Please share the curriculum PDF and seat booking details.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Hardware & Embedded/IoT Projects
 */
export function getHardwareProjectWhatsAppUrl(
  project: { title: string; microcontroller?: string; category?: string },
  inquiryType: 'kit_purchase' | 'circuit_diagram' | 'mentorship' | 'ready_project' | 'general' = 'general'
): string {
  let actionIntent = 'Hardware Kit Purchase & 1-on-1 Mentorship';
  if (inquiryType === 'circuit_diagram') {
    actionIntent = 'Circuit Schematic, Pinout & Fritzing Diagram Request';
  } else if (inquiryType === 'ready_project') {
    actionIntent = 'Ready-to-Test Final Year Project Submission Package';
  } else if (inquiryType === 'mentorship') {
    actionIntent = '1-on-1 Lab & Code Debugging Mentorship';
  }

  const msg = `🤖 Hello TechTrainX Hardware & Embedded Division,

I want to inquire about: *${project.title}*
⚡ *Microcontroller*: ${project.microcontroller || 'Arduino Uno / ESP32 / Embedded'}
📂 *Category*: ${project.category || 'Robotics & IoT'}
🎯 *Inquiry Reason*: ${actionIntent}

Please share component kit availability, circuit diagram details, pricing, and project report deliverables.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Circuit Diagram & Schematic Downloads
 */
export function getCircuitDiagramWhatsAppUrl(projectTitle: string, microcontroller: string): string {
  const msg = `⚡ Hello TechTrainX Embedded Team,

I am requesting the complete *Circuit Diagram, Pinout Connections & Fritzing Schematic* for:
🛠️ *Project*: ${projectTitle}
📟 *Controller*: ${microcontroller}

Please share the PDF schematic and sensor wiring guide.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Training Programs (Summer Training, Apprenticeship, etc.)
 */
export function getProgramWhatsAppUrl(program: { title: string; duration?: string; subtitle?: string }): string {
  const msg = `🎓 Hello TechTrainX Admissions,

I want to apply for the *${program.title}*${program.duration ? ` (${program.duration})` : ''}.
${program.subtitle ? `📌 Focus: ${program.subtitle}` : ''}

🎯 *Reason for Contact*: Program admission, university certificate approval, daily 5-hour lab slots, and early bird discounts.

Please guide me with the enrollment procedure.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Batch Booking
 */
export function getBatchWhatsAppUrl(batch: { courseTitle: string; startDate: string; timing: string; mode: string }): string {
  const msg = `📅 Hello TechTrainX Coordinator,

I want to reserve a seat in the upcoming batch:
📘 *Course*: ${batch.courseTitle}
🚀 *Starting Date*: ${batch.startDate}
⏰ *Timing*: ${batch.timing}
📍 *Mode*: ${batch.mode}

🎯 *Reason for Contact*: Seat reservation & admission confirmation.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Software Services
 */
export function getServiceWhatsAppUrl(serviceName: string): string {
  const msg = `💼 Hello TechTrainX Software Solutions & Enterprise Services,

We are interested in discussing custom software development for:
🚀 *Service*: ${serviceName}

🎯 *Reason for Contact*: Requirement briefing, technical architecture discussion, and project quote estimation.

Please connect us with a Senior Technical Architect.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Placement Assistance
 */
export function getPlacementWhatsAppUrl(): string {
  const msg = `🚀 Hello TechTrainX Placement Cell,

I would like to know more about the *100% Placement Assistance Program*, upcoming campus hiring drives, and resume engineering prep.

🎯 *Reason for Contact*: Placement criteria, partner MNC recruiters list, and student training records.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Free Demo & Summer 2026-27 Admissions Grant
 */
export function getAdmissionGrantWhatsAppUrl(discountCode: string = 'SUMMER2026-27'): string {
  const msg = `🎁 Hello TechTrainX Admissions,

I would like to claim the *Summer 2026-27 Student Admission Grant & Free Demo Class* (Code: *${discountCode}*).

🎯 *Reason for Contact*: Free trial coding session booking and fee scholarship application.`;

  return buildWhatsAppLink(msg);
}

/**
 * Pre-generated WhatsApp link for Certificate Verification Help
 */
export function getCertificateHelpWhatsAppUrl(certId?: string): string {
  const msg = `📜 Hello TechTrainX Verification Cell,

I need assistance regarding Certificate Verification${certId ? ` for ID: *${certId}*` : ''}.

🎯 *Reason for Contact*: College submission verification, employer credential confirmation, or duplicate copy request.`;

  return buildWhatsAppLink(msg);
}

/**
 * Legacy / Generic backward-compatible helper
 */
export function createWhatsAppDirectQueryLink(subjectReason: string = 'General Inquiry'): string {
  const msg = `👋 Hello TechTrainX Helpline,

I am contacting you regarding: *${subjectReason}*.

🎯 *Reason for Contact*: Detailed guidance, curriculum inquiry, and enrollment assistance.
Please connect me with an academic counselor.`;

  return buildWhatsAppLink(msg);
}
