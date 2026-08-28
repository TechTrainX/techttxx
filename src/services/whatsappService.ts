import { COMPANY_CONFIG } from '../config/companyConfig.js';

/**
 * TechTrainX WhatsApp Direct Communication Service
 * Organization: TechTrainX Technologies (A Unit of Xnava Enterprise)
 * Official Helpline: +91 8545092070
 */

export function getWhatsAppNumber(): string {
  const envPhone = (import.meta as any).env?.VITE_WHATSAPP_PHONE;
  if (envPhone) {
    return envPhone.replace(/[^0-9]/g, '');
  }
  return COMPANY_CONFIG.phone.replace(/[^0-9]/g, '');
}

export interface WhatsAppEnrollPayload {
  studentName: string;
  courseOrProgram: string;
  phone: string;
  email?: string;
  collegeName?: string;
  preferredTiming?: string;
}

export function createWhatsAppEnrollLink(data: WhatsAppEnrollPayload): string {
  const phone = getWhatsAppNumber();
  const text = `👋 Hello TechTrainX Admissions Team,

I would like to ENROLL / INQUIRE about the course:
📘 *Course / Program:* ${data.courseOrProgram}
👤 *Student Name:* ${data.studentName}
📞 *Mobile:* ${data.phone}
${data.email ? `✉️ *Email:* ${data.email}\n` : ''}${data.collegeName ? `🎓 *College:* ${data.collegeName}\n` : ''}${data.preferredTiming ? `⏰ *Preferred Slot:* ${data.preferredTiming}\n` : ''}
🎯 *Reason for Contact*: Course admission, syllabus brochure, fee structure & discount inquiries.

Please share the curriculum PDF and confirm seat booking.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppDirectQueryLink(queryTopic?: string): string {
  const phone = getWhatsAppNumber();
  const topicText = queryTopic ? ` regarding *${queryTopic}*` : '';
  const text = `👋 Hello TechTrainX Helpline Team,

I have a query${topicText}.

🎯 *Reason for Contact*: Academic guidance, batch schedule details, and admission assistance.
Please connect me with an instructor or student counselor.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppSoftwareQuoteLink(projectName: string, projectType: string): string {
  const phone = getWhatsAppNumber();
  const text = `💼 Hello TechTrainX Software Solutions & Engineering Team,

We require a Software Development Consultation & Quote:
💻 *Project Name:* ${projectName}
🚀 *Category:* ${projectType}

🎯 *Reason for Contact*: Technical architecture discussion, project estimation, and developer allocation.

Please connect us with a Senior Technical Architect.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppHardwareProjectLink(
  projectTitle: string,
  studentName?: string,
  collegeName?: string,
  customReason?: string
): string {
  const phone = getWhatsAppNumber();
  const studentInfo = studentName ? `\n👤 *Student Name:* ${studentName}` : '';
  const collegeInfo = collegeName ? `\n🎓 *College:* ${collegeName}` : '';
  const reason = customReason || 'Hardware Kit Order & 1-on-1 Build Mentorship';
  
  const text = `🤖 Hello TechTrainX Embedded Systems & Hardware Division,

I want to inquire about: *${projectTitle}*
🎯 *Reason for Contact*: ${reason}
📦 *Kit Package*: Components + Tested Arduino Code + Circuit Schematics + 1-on-1 Mentorship + Viva Report${studentInfo}${collegeInfo}

Please share component kit availability, circuit diagram details, student pricing, and dispatch schedule.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppCircuitDiagramLink(projectTitle: string, microcontroller: string): string {
  const phone = getWhatsAppNumber();
  const text = `⚡ Hello TechTrainX Embedded Team,

I am requesting the *Circuit Diagram, Pinout Map & Fritzing Schematic* for:
🛠️ *Project:* ${projectTitle}
📟 *Microcontroller:* ${microcontroller}

🎯 *Reason for Contact*: Circuit wiring verification, component pin connections, and schematic reference for college project submission.

Please share the high-resolution schematic PDF.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppBatchBookingLink(courseTitle: string, startDate: string, timing: string, mode: string): string {
  const phone = getWhatsAppNumber();
  const text = `📅 Hello TechTrainX Admissions,

I want to reserve a seat in the upcoming batch:
📘 *Course:* ${courseTitle}
🚀 *Batch Start Date:* ${startDate}
⏰ *Daily Slot:* ${timing}
📍 *Training Mode:* ${mode}

🎯 *Reason for Contact*: Seat reservation & early-bird batch enrollment confirmation.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppProgramLink(programTitle: string, duration: string): string {
  const phone = getWhatsAppNumber();
  const text = `🎓 Hello TechTrainX Admissions,

I want to apply for the *${programTitle}* (${duration}).

🎯 *Reason for Contact*: Program admission, university certificate approval, daily 5-hour lab slots, and early bird discount details.

Please guide me with the enrollment procedure.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
