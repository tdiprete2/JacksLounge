import nodemailer from 'nodemailer';
import type { InsertContactRequest } from '@shared/schema';

interface EmailConfig {
  from: string;
  to: string;
  replyTo?: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private contactEmail: string;

  constructor() {
    this.contactEmail = process.env.CONTACT_EMAIL || 'tdiprete23@gmail.com';
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Check for email configuration
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const emailPort = parseInt(process.env.EMAIL_PORT || '587');

    if (emailUser && emailPass) {
      this.transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });
      console.log('✉️  Email service initialized with SMTP');
    } else {
      console.warn('Email notifications are disabled because SMTP is not configured.');
    }
  }

  async sendContactNotification(contact: InsertContactRequest): Promise<boolean> {
    const fullName = `${contact.firstName} ${contact.lastName || ''}`.trim();
    const subject = `New Contact Request from ${fullName.replace(/[\r\n]+/g, " ")}`;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      ${contact.company ? `<p><strong>Company:</strong> ${escapeHtml(contact.company)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This is an automated notification from Jack's Lounge website contact form.</small></p>
    `;

    const text = `
New Contact Form Submission

From: ${contact.firstName} ${contact.lastName || ''}
Email: ${contact.email}
${contact.company ? `Company: ${contact.company}\n` : ''}
Message:
${contact.message}

---
This is an automated notification from Jack's Lounge website contact form.
    `;

    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: this.contactEmail,
        replyTo: contact.email,
        subject,
        text,
        html,
      });
      console.log('Contact notification email sent.');
      return true;
    } catch (error) {
      console.error('Contact notification email failed to send.');
      return false;
    }
  }
}

export const emailService = new EmailService();
