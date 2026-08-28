import nodemailer from 'nodemailer';
import { escapeHtml } from '../utils/validators';

/**
 * TechTrainX Enterprise Notification & Email Routing Engine
 * Primary Mailboxes:
 * - Main Owner: info@xnava.in
 * - Platform Inbox: info@xnava.in
 * - Admissions Office: admission@xnava.in
 * - General Desk: info@xnava.in
 */

export interface EmailAlertPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  details: string;
  leadType?: 'enrollment' | 'hardware_inquiry' | 'contact' | 'software_quote' | 'general';
  metadata?: Record<string, string | number | undefined>;
}

// Master Admin & Owner Recipients
const DEFAULT_RECIPIENTS = [
  'info@xnava.in', // Main Owner
  'info@xnava.in',             // Platform Desk
  'admission@xnava.in'        // Admissions Department
];

export async function sendHostingerEmailAlert(payload: EmailAlertPayload): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER || 'info@xnava.in';
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  // Configured recipients (including NOTIFICATION_EMAIL from .env if defined)
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const ownerEnvList = process.env.OWNER_ALERT_EMAILS 
    ? process.env.OWNER_ALERT_EMAILS.split(',').map(s => s.trim())
    : DEFAULT_RECIPIENTS;

  const recipients = Array.from(new Set([
    ...ownerEnvList, 
    notificationEmail, 
    smtpUser
  ])).filter((email): email is string => Boolean(email && email.includes('@')));

  const cleanPhoneDigits = payload.phone.replace(/[^0-9]/g, '');
  const whatsAppPhone = cleanPhoneDigits.startsWith('91') && cleanPhoneDigits.length === 12
    ? cleanPhoneDigits
    : cleanPhoneDigits.length === 10
    ? `91${cleanPhoneDigits}`
    : cleanPhoneDigits;

  const leadRefId = `TTX-${Date.now().toString(36).toUpperCase()}`;

  // Security XSS Prevention: Escape all user-provided data
  const safeFullName = escapeHtml(payload.fullName);
  const safePhone = escapeHtml(payload.phone);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject);
  const safeDetails = escapeHtml(payload.details);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TechTrainX Action Alert</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040915; color: #f1f5f9; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #0c1427; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .header { background: linear-gradient(135deg, #004080, #0066cc); padding: 24px; text-align: left; }
        .badge { display: inline-block; background: #00061a; color: #38bdf8; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
        .body { padding: 28px; }
        .field-group { margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px; }
        .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 15px; color: #ffffff; font-weight: 600; }
        .highlight-box { background: #131d36; border: 1px solid #233558; border-radius: 10px; padding: 16px; margin-top: 16px; }
        .btn-group { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
        .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none; text-align: center; }
        .btn-primary { background: #25d366; color: #ffffff; }
        .btn-blue { background: #0066cc; color: #ffffff; }
        .footer { background: #080d1a; padding: 16px 28px; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">Reference ID: ${leadRefId}</span>
          <h1 style="color: #ffffff; margin: 8px 0 0 0; font-size: 20px;">⚡ TechTrainX Action Required</h1>
          <p style="color: #cbd5e1; margin: 4px 0 0 0; font-size: 13px;">New Candidate / Client Submission Dispatched to Owner</p>
        </div>

        <div class="body">
          <div class="field-group">
            <div class="label">Candidate / Contact Name</div>
            <div class="value" style="color: #38bdf8; font-size: 18px;">${safeFullName}</div>
          </div>

          <div class="field-group">
            <div class="label">Verified Contact Phone</div>
            <div class="value">${safePhone}</div>
          </div>

          <div class="field-group">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a></div>
          </div>

          <div class="field-group">
            <div class="label">Inquiry Focus / Subject</div>
            <div class="value">${safeSubject}</div>
          </div>

          <div class="highlight-box">
            <div class="label" style="color: #38bdf8; margin-bottom: 8px;">Detailed Information & Notes:</div>
            <div style="font-size: 13px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${safeDetails}</div>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(`Hello ${payload.fullName}, this is TechTrainX (A Unit of Xnava Enterprise - xnava.in). We received your inquiry regarding ${payload.subject}.`)}" 
               style="background-color: #22c55e; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: bold; font-size: 13px; display: inline-block; margin: 4px;">
              💬 Open WhatsApp Chat
            </a>
            <a href="tel:${cleanPhoneDigits}" 
               style="background-color: #0066cc; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: bold; font-size: 13px; display: inline-block; margin: 4px;">
              📞 Call Candidate Now
            </a>
          </div>
        </div>

        <div class="footer">
          Dispatched securely to Owner (${recipients.join(', ')}) via TechTrainX Platform Engine.<br/>
          TechTrainX — A Unit of Xnava Enterprises (<a href="https://xnava.in" style="color: #38bdf8; text-decoration: none;">xnava.in</a>)
        </div>
      </div>
    </body>
    </html>
  `;

  // If live credentials are available
  if (smtpPass && smtpPass !== 'your_hostinger_email_password' && smtpPass !== 'your-hostinger-mailbox-password') {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: `"TechTrainX Enterprise Alert" <${smtpUser}>`,
        to: recipients.join(', '),
        replyTo: payload.email,
        subject: `[TTX Action Alert] ${payload.subject} — ${payload.fullName} (${payload.phone})`,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Nodemailer Dispatch Success] Alert routed to owners: ${recipients.join(', ')} for candidate ${payload.fullName}`);
      return true;
    } catch (err: any) {
      console.error('[Nodemailer Error sending email]:', err?.message || err);
      return false;
    }
  }

  // Fallback logger for dev/demo mode
  console.log(`[Nodemailer Dispatch Simulation]
  To: ${recipients.join(', ')}
  Candidate: ${payload.fullName} (${payload.phone} | ${payload.email})
  Subject: ${payload.subject}
  Details: ${payload.details}
  Ref: ${leadRefId}`);
  return true;
}
