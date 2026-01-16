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
    files: {
      cvPdf: string;
      cinPdf: string;
      bacPdf: string;
    };
  };
  professionalInformation: {
    parcoursEtDiplomes: Array<{
      intituleDiplome: string;
      diplomeType: string;
      specialite: string;
      anneeObtention: string;
      etablissement: string;
    }>;
    niveauxLangues: Array<{
      langue: string;
      niveau: string;
    }>;
  };
}

export const MOCK_CANDIDATES: CandidateProfile[] = [
  {
    _id: "c1",
    status: "pending",
    appliedDate: "2025-10-05T10:30:00Z",
    personalInformation: {
      prenom: "Ahmed",
      nom: "Benali",
      prenomAr: "أحمد",
      nomAr: "بنعلي",
      email: "ahmed.benali@example.com",
      cin: "AB123456",
      dateNaissance: "1995-03-15",
      situation: "Single",
      telephone: "+212 600 000 000",
      adresse: "123 Bd Zerktouni, Casablanca",
      files: {
        cvPdf: "cv_ahmed_benali.pdf",
        cinPdf: "cin_scan.pdf",
        bacPdf: "baccalaureate.pdf"
      }
    },
    professionalInformation: {
      parcoursEtDiplomes: [
        {
          intituleDiplome: "Master in Computer Science",
          diplomeType: "Master",
          specialite: "Software Engineering",
          anneeObtention: "2018",
          etablissement: "ENSIAS"
        }
      ],
      niveauxLangues: [
        { langue: "French", niveau: "C1" },
        { langue: "English", niveau: "B2" }
      ]
    }
  },
  {
    _id: "c2",
    status: "accepted",
    appliedDate: "2025-10-02T14:15:00Z",
    personalInformation: {
      prenom: "Fatima",
      nom: "Zohra",
      prenomAr: "فاطمة",
      nomAr: "الزهراء",
      email: "fatima.zohra@example.com",
      cin: "CD987654",
      dateNaissance: "1997-07-22",
      situation: "Married",
      telephone: "+212 611 111 111",
      adresse: "45 Av Al Massira, Rabat",
      files: {
        cvPdf: "cv_fatima.pdf",
        cinPdf: "cin_scan.pdf",
        bacPdf: "bac_copy.pdf"
      }
    },
    professionalInformation: {
      parcoursEtDiplomes: [
        {
          intituleDiplome: "State Engineer",
          diplomeType: "Engineer",
          specialite: "Data Science",
          anneeObtention: "2020",
          etablissement: "INPT"
        }
      ],
      niveauxLangues: [
        { langue: "Arabic", niveau: "Native" },
        { langue: "English", niveau: "C2" }
      ]
    }
  }
];
