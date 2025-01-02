/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOffer, JobOfferSchema } from 'src/schemas/JobOffer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobOffer.name,
        schema: JobOfferSchema,
      },
    ]),
  ],
  controllers: [JobOffersController],
  providers: [JobOffersService],
})
export class JobOffersModule {}
