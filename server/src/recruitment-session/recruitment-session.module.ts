/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RecruitmentSessionService } from './recruitment-session.service';
import { RecruitmentSessionController } from './recruitment-session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecruitmentSession,
  RecruitmentSessionSchema,
} from 'src/schemas/recruitment-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecruitmentSession.name, schema: RecruitmentSessionSchema },
    ]),
  ],
  controllers: [RecruitmentSessionController],
  providers: [RecruitmentSessionService],
  exports: [RecruitmentSessionService],
})
export class RecruitmentSessionModule {}
