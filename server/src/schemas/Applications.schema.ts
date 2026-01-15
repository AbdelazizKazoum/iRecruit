import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { JobOffer } from './JobOffer.schema';
import { RecruitmentSession } from './recruitment-session.schema';
import { Tranche } from './tranche.schema';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'JobOffer', required: true })
  offer: JobOffer;

  @Prop({
    type: Types.ObjectId,
    ref: 'RecruitmentSession',
    required: true,
  })
  session: RecruitmentSession;

  @Prop({ type: Types.ObjectId, ref: 'Tranche', required: true })
  tranche: Tranche;

  @Prop({ required: true })
  applicationDiploma: string;

  @Prop({
    type: Object,
    default: {
      ar: 'قيد التحقق',
      fr: 'En cours de vérification',
      en: 'Under Review',
    },
  })
  statut: {
    ar: string;
    fr: string;
    en: string;
  };

  @Prop({ type: Date, default: Date.now })
  recuCandidature: Date;

  @Prop({ type: Object })
  attachment: {
    declarationPdf: string;
    motivationLetterPdf: string;
  };
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
