/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CandidatureType {
  // Personal Information
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
    parcoursEtDiplomes?: ParcoursEtDiplomesTypes[];
    niveauxLangues?: NiveauxLanguesType[];
    experiencePedagogique?: {
      experiencePedagogiqueEnHeures: number;
    };
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
