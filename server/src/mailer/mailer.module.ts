/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService], // Export service to use in other modules
})
export class MailerModule {}
