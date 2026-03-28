export interface Session {
  _id: string;
  yearLabel: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface Tranche {
  _id: string;
  name: string;
  session: Session;
  jobOfferId: string;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  maxCandidates?: number;
  currentCandidates: number;
}

export interface CandidateProfile {
  _id: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
  // Application-level metadata used in admin review.
  applicationDiploma?: string;
  applicationAttachments?: {
    declarationPdf?: string;
    motivationLetterPdf?: string;
  };
  personalInformation: {
    prenom: string;
    nom: string;
    prenomAr: string;
    nomAr: string;
    email: string;
    cin: string;
    dateNaissance: string;
    situation: string;
    telephone: string;
    adresse: string;
    // Extended personal details captured in the candidature flow.
    adresseAr?: string;
    lieuNaissance?: string;
    sexe?: string;
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
      cvPdf: string;
      cinPdf: string;
      bacPdf: string;
      // Optional work attestation document for government employees.
      attestation?: string;
    };
  };
  professionalInformation: {
    parcoursEtDiplomes: Array<{
      intituleDiplome: string;
      diplomeType: string;
      specialite: string;
      anneeObtention: string;
      etablissement: string;
      // Optional diploma attachment stored on the backend.
      files?: {
        diplomePdf?: string;
      };
    }>;
    niveauxLangues: Array<{
      langue: string;
      niveau: string;
      // Optional language certificate attachment.
      files?: {
        certificatLanguePdf?: string;
      };
    }>;
    // Optional professional sections captured in the candidature flow.
    experiences?: Array<{
      position: string;
      company: string;
      startDate: string;
      endDate?: string;
      currentlyWorking?: boolean;
      description?: string;
      highlights?: string[] | string;
    }>;
    experiencePedagogique?: Array<{
      experiencePedagogiqueEnHeures?: number;
      poste?: string;
      etablissement?: string;
      dateDebut?: string;
      dateFin?: string;
      ville?: string;
      description?: string;
    }>;
    publications?: Array<{
      titre: string;
      anneePublication: number;
      type: string;
      url: string;
      // Optional publication attachment.
      files?: {
        publicationPdf?: string;
      };
    }>;
    communications?: Array<{
      titre: string;
      anneeCommunication: number;
      url: string;
      // Optional communication attachment.
      files?: {
        communicationPdf?: string;
      };
    }>;
    residanat?: Array<{
      residanatPdf?: string;
    }>;
    autresDocuments?: Array<{
      intitule: string;
      documentPdf?: string;
    }>;
  };
}
