import { UserType } from "./user.types";

export interface ApplicationType {
  user?: UserType;
  applicationDiploma: string;
  offer: OfferType | null;

  recuCandidature?: Date;

  statut: {
    fr: string;
    en: string;
    ar: string;
  };

  attachment: {
    declarationPdf: string | File;
    motivationLetterPdf: string | File;
  };
}

export interface OfferType {
  _id?: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };

  description: {
    fr: string;
    en: string;
    ar: string;
  };

  tag: {
    fr: string;
    en: string;
    ar: string;
  };
  datePublication: string;
  depotAvant: string;
  imageUrl: string;
  city: {
    fr: string;
    en: string;
    ar: string;
  };
  department: {
    fr: string;
    en: string;
    ar: string;
  };
  candidatesNumber: number;

  grade: {
    fr: string;
    en: string;
    ar: string;
  };

  organisme: {
    fr: string;
    en: string;
    ar: string;
  };

  specialite: {
    fr: string;
    en: string;
    ar: string;
  };

  etablissement: {
    fr: string;
    en: string;
    ar: string;
  };
}
