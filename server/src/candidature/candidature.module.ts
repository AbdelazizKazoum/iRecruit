/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CandidatureController } from './candidature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidature, CandidatureSchema } from 'src/schemas/candidature.schema';
import { SharedModule } from 'src/common/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidature.name, schema: CandidatureSchema },
    ]),
    SharedModule,
  ],
  controllers: [CandidatureController],
  providers: [CandidatureService],
})
export class CandidatureModule {}
