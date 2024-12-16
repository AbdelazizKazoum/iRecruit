/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

// Define the types
export type UserDetailsDocument = HydratedDocument<UserDetails>;

// UserDetails Schema
@Schema()
export class UserDetails {
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
    files: {
      cinPdf: string;
      bacPdf: string;
      cvPdf: string;
    };
  };

  // Professional Information
  @Prop({ type: Object, required: true })
  professionalInformation: {
    parcoursEtDiplomes?: {
      origine: 'etranger' | 'marocainPrive' | 'marocainPublic';
      intituleDiplome: string;
      diplomeType: string;
      anneeObtention: number;
      specialite: string;
      mention: string;
      etablissement: string;
      diplomePdf: string;
    };
    niveauxLangues?: {
      langue: string;
      niveau: 'avance' | 'basique' | 'intermediare';
      certificatLanguePdf?: string;
    };
    experiencePedagogique?: {
      experiencePedagogiqueEnHeures: number;
    };
    publications?: {
      titre: string;
      anneePublication: number;
      type: string;
      url: string;
      publicationPdf: string;
    };
    communications?: {
      titre: string;
      anneeCommunication: number;
      url: string;
      communicationPdf: string;
    };
    residanat?: {
      residanatPdf?: string;
    };
    autresDocuments?: {
      intitule: string;
      documentPdf?: string;
    };
  };
}

// Create Schema
export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
