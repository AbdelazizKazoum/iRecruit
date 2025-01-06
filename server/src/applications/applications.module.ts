/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Application,
  ApplicationSchema,
} from 'src/schemas/Applications.schema';
import { SharedModule } from 'src/common/shared.module';
import { PassportModule } from '@nestjs/passport';
import { CandidatureModule } from 'src/candidature/candidature.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
    ]),
    CandidatureModule,
    PassportModule,
    SharedModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
