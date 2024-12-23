/* eslint-disable prettier/prettier */
export class PersonalInformationDto {
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
}
