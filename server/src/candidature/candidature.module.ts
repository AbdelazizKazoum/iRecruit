/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CandidatureController } from './candidature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidature, CandidatureSchema } from 'src/schemas/candidature.schema';
import { SharedModule } from 'src/common/shared.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidature.name, schema: CandidatureSchema },
    ]),
    PassportModule,
    SharedModule,
  ],
  controllers: [CandidatureController],
  providers: [CandidatureService],
  exports: [MongooseModule],
})
export class CandidatureModule {}
