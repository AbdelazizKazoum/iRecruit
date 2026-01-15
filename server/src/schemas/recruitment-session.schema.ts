import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecruitmentSessionDocument = HydratedDocument<RecruitmentSession>;

@Schema({ timestamps: true })
export class RecruitmentSession {
  @Prop({ required: true })
  yearLabel: string; // "2025/2026"

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  description?: string;
}

export const RecruitmentSessionSchema =
  SchemaFactory.createForClass(RecruitmentSession);
