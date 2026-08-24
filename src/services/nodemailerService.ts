import nodemailer from 'nodemailer';

/**
 * TechTrainX Nodemailer Service
 * Primary Mailbox: ttx@xnava.in | admission@xnava.in | info@xnava.in
 */

export interface EmailAlertPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  details: string;
}

export async function sendHostingerEmailAlert(payload: EmailAlertPayload): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER || 'ttx@xnava.in';
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

  // If live credentials are available
  if (smtpPass && smtpPass !== 'your-hostinger-mailbox-password') {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"TechTrainX Platform" <${smtpUser}>`,
        to: smtpUser,
        replyTo: payload.email,
        subject: `[TechTrainX Alert] ${payload.subject} - ${payload.fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0b1222; color: #ffffff; padding: 24px; border-radius: 12px;">
            <h2 style="color: #06b6d4; border-bottom: 2px solid #334155; padding-bottom: 8px;">
              TechTrainX Inquiry Alert
            </h2>
            <p><strong>Candidate Name:</strong> ${payload.fullName}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Phone:</strong> ${payload.phone}</p>
            <p><strong>Subject:</strong> ${payload.subject}</p>
            <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin-top: 12px; color: #e2e8f0;">
              <strong>Message Details:</strong><br/>
              ${payload.details}
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">
              Sent automatically from TechTrainX Platform engine.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Nodemailer] Email dispatched to ${smtpUser} for ${payload.fullName}`);
      return true;
    } catch (err) {
      console.error('[Nodemailer Error]', err);
      return false;
    }
  }

  // Fallback logger for dev mode when SMTP credentials are placeholders
  console.log(`[Nodemailer Dispatch] Email logged for ${smtpUser}:
    Candidate: ${payload.fullName}
    Email: ${payload.email}
    Subject: ${payload.subject}
  `);
  return true;
}
