import { UserType } from "./user.types";

export interface ApplicationType {
  user?: UserType;
  applicationDiploma: string;
  offer: OfferType | null;

  attachment: {
    declarationPdf: string | File;
    motivationLetterPdf: string | File;
  };
}

export interface OfferType {
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
}
