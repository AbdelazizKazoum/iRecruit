/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CandidatureDocument = HydratedDocument<Candidature>;

@Schema()
export class Candidature {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CandidatureSchema = SchemaFactory.createForClass(Candidature);
