import nodemailer from 'nodemailer';
import type { InsertContactRequest } from '@shared/schema';

interface EmailConfig {
  from: string;
  to: string;
  replyTo?: string;
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
      console.log('⚠️  Email credentials not configured - emails will be logged only');
      console.log('   Set EMAIL_USER and EMAIL_PASS to enable email sending');
    }
  }

  async sendContactNotification(contact: InsertContactRequest): Promise<boolean> {
    const subject = `New Contact Request from ${contact.firstName} ${contact.lastName || ''}`;
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contact.firstName} ${contact.lastName || ''}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
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
      console.log('📧 Email would be sent to:', this.contactEmail);
      console.log('Subject:', subject);
      console.log('Content:', text);
      return true;
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
      console.log('✅ Contact notification email sent to:', this.contactEmail);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
