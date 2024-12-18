/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type CandidatureDocument = HydratedDocument<Candidature>;

@Schema()
export class Candidature {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  // Personal Information
  @Prop({ type: Object, required: true })
  personalInformation: {
    prenom: string;
    prenomAr: string;
    nom: string;
    nomAr: string;
    adresse: string;
    adresseAr: string;
    lieuNaissance: string;
    cin: string;
    dateNaissance: Date;
    sexe: 'feminin' | 'masculin';
    situation: 'celibataire' | 'divorce' | 'marie' | 'veuf';
    telephone: string;
    email: string;

    experiences?: {
      fonctionnaire?: boolean;
      fonction?: string;
      ppr?: string;
      attestation?: string;
    };

    situationDeHandicap?: {
      handicap?: boolean;
      typeHandicap?: string;
    };
    files: any;
  };

  // Professional Information
  @Prop({ type: Object })
  professionalInformation: {
    parcoursEtDiplomes?: {
      origine: 'etranger' | 'marocainPrive' | 'marocainPublic';
      intituleDiplome: string;
      diplomeType: string;
      anneeObtention: number;
      specialite: string;
      mention: string;
      etablissement: string;
      files: any;
    }[];
    niveauxLangues?: {
      langue: string;
      niveau: 'avance' | 'basique' | 'intermediare';
      certificatLanguePdf?: string;
    }[];
    experiencePedagogique?: {
      experiencePedagogiqueEnHeures: number;
    }[];
    publications?: {
      titre: string;
      anneePublication: number;
      type: string;
      url: string;
      publicationPdf: string;
    }[];
    communications?: {
      titre: string;
      anneeCommunication: number;
      url: string;
      communicationPdf: string;
    }[];
    residanat?: {
      residanatPdf?: string;
    }[];
    autresDocuments?: {
      intitule: string;
      documentPdf?: string;
    }[];
  };
}

export const CandidatureSchema = SchemaFactory.createForClass(Candidature);
