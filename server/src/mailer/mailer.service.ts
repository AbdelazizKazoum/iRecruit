/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private apiInstance: Brevo.TransactionalEmailsApi;
  private readonly logger = new Logger(MailerService.name);

  constructor(private configService: ConfigService) {
    this.apiInstance = new Brevo.TransactionalEmailsApi();
    // Configure API key authorization: api-key
    this.apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      this.configService.get<string>('BREVO_API_KEY'),
    );
  }

  /**
   * Generic method to send an email using Brevo
   * @param to Recipient email address
   * @param subject Email subject
   * @param htmlContent HTML content of the email
   */
  async sendEmail(to: string, subject: string, htmlContent: string) {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = {
      name: this.configService.get<string>('BREVO_SENDER_NAME') || 'iRecruit Team',
      email: this.configService.get<string>('BREVO_SENDER_EMAIL') || 'noreply@irecruit.com',
    };
    sendSmtpEmail.to = [{ email: to }];

    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      this.logger.log(
        `Email sent successfully to ${to}. Message ID: ${data.body.messageId}`,
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error sending email to ${to}:`,
        error.body || error.message,
      );
      throw error;
    }
  }

  /**
   * Sends a verification email to the user
   * @param to User's email address
   * @param verificationLink The link to verify the email
   */
  async sendVerificationEmail(to: string, verificationLink: string) {
    const subject = 'Verify your email address - iRecruit';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to iRecruit!</h2>
        <p>Thank you for signing up. Please confirm your email address to get started.</p>
        <div style="margin: 20px 0;">
          <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
        </div>
        <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
        <p style="color: #666; font-size: 14px;">${verificationLink}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #999; font-size: 12px;">If you did not create an account, no further action is required.</p>
      </div>
    `;
    return this.sendEmail(to, subject, htmlContent);
  }
}
