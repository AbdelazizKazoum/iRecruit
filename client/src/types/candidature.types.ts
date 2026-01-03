/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CandidatureType {
  // Personal Information
  personalInformation: {
    valid: boolean;
    prenom: string;
    prenomAr: string;
    nom: string;
    nomAr: string;
    adresse: string;
    adresseAr: string;
    lieuNaissance: string;
    cin: string;
    dateNaissance: Date;
    sexe: "feminin" | "masculin";
    situation: "celibataire" | "divorce" | "marie" | "veuf";
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
  professionalInformation: {
    valid: boolean;
    parcoursEtDiplomes?: ParcoursEtDiplomesTypes[];
    niveauxLangues?: NiveauxLanguesType[];
    experiences?: ExperienceType[];
    experiencePedagogique?: {
      experiencePedagogiqueEnHeures: number;
    };
    publications?: PublicationsType[];
    communications?: communicationsType[];

    residanat?: {
      residanatPdf?: string;
    };
    autresDocuments?: {
      intitule: string;
      documentPdf?: string;
    };
  };
}

export interface ParcoursEtDiplomesTypes {
  origine: string;
  intituleDiplome: string;
  diplomeType: string;
  anneeObtention: number;
  specialite: string;
  mention: string;
  etablissement: string;
  files: {
    diplomePdf: File | string;
  };
}

export interface NiveauxLanguesType {
  langue: string;
  niveau: "avance" | "basique" | "intermediare";
  files: {
    certificatLanguePdf?: File | string;
  };
}

export interface PublicationsType {
  titre: string;
  anneePublication: number;
  type: string;
  url: string;
  files: {
    publicationPdf?: File | string;
  };
}

export interface communicationsType {
  titre: string;
  anneeCommunication: number;
  url: string;
  files: { communicationPdf: File | string };
}

export interface ExperienceType {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  highlights?: string[] | string;
}
