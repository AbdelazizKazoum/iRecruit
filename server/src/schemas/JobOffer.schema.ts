/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type JobOfferDocument = HydratedDocument<JobOffer>;

@Schema()
export class JobOffer {
  @Prop({ type: Object })
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  @Prop({ type: Object })
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  @Prop({ type: Object })
  tag: {
    fr: string;
    en: string;
    ar: string;
  };
  @Prop()
  datePublication: string;

  @Prop()
  depotAvant: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: Object })
  city: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop({ type: Object })
  department: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop()
  candidatesNumber: number;

  @Prop({ type: Object })
  grade?: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop({ type: Object })
  organisme?: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop({ type: Object })
  specialite?: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop({ type: Object })
  etablissement?: {
    fr: string;
    en: string;
    ar: string;
  };

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User; // recruiter
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);
