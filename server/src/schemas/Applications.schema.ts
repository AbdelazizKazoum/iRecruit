/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { JobOffer } from './JobOffer.schema';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  applicationDiploma: string;

  @Prop({ type: Types.ObjectId, ref: 'JobOffer', required: true })
  offer: JobOffer;

  @Prop({
    type: Object,
    default: {
      ar: 'قيد التحقق',
      fr: 'En cours de vérification',
      en: 'Under Review',
    },
  })
  statut: Locale;

  @Prop({ type: Date, required: true, default: Date.now })
  recuCandidature?: Date;

  @Prop({ type: Object })
  attachment: {
    declarationPdf: string | File;
    motivationLetterPdf: string | File;
  };
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
