/* eslint-disable prettier/prettier */
// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { SendGridConstants } from 'src/common/constants';

@Injectable()
export class MailerService {
  constructor() {
    sgMail.setApiKey(SendGridConstants.API_KEY);
  }

  async sendMail(mailOptions: { to: string; subject: string; text: string }) {
    const msg = {
      to: mailOptions.to,
      from: 'your-email@example.com',
      subject: mailOptions.subject,
      text: mailOptions.text,
    };
    await sgMail.send(msg);
  }
}
