import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { JobOffer } from './JobOffer.schema';
import { RecruitmentSession } from './recruitment-session.schema';

export type TrancheDocument = HydratedDocument<Tranche>;

@Schema({ timestamps: true })
export class Tranche {
  @Prop({ required: true })
  name: string; // "Tranche 1", "Tranche 2"

  @Prop({ type: Types.ObjectId, ref: 'RecruitmentSession', required: true })
  session: RecruitmentSession;

  @Prop({ type: Types.ObjectId, ref: 'JobOffer', required: true })
  jobOffer: JobOffer;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true })
  isOpen: boolean;

  @Prop()
  maxCandidates?: number;
}

export const TrancheSchema = SchemaFactory.createForClass(Tranche);
