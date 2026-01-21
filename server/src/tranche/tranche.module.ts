/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrancheController } from './tranche.controller';
import { TrancheService } from './tranche.service';
import { Tranche, TrancheSchema } from 'src/schemas/tranche.schema';
import {
  RecruitmentSession,
  RecruitmentSessionSchema,
} from 'src/schemas/recruitment-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tranche.name, schema: TrancheSchema },
      { name: RecruitmentSession.name, schema: RecruitmentSessionSchema },
    ]),
  ],
  controllers: [TrancheController],
  providers: [TrancheService],
  exports: [TrancheService],
})
export class TrancheModule {}
