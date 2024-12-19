import { CandidatureType } from "@/types/candidature.types";
import { create } from "zustand";

export interface CandidatureStoreState {
  candidatureData: CandidatureType | null;
  loading: boolean;
  error: string;

  setPersonalInformation: (
    data: CandidatureType["personalInformation"]
  ) => void;
  setDiplomes: (
    data: CandidatureType["professionalInformation"]["parcoursEtDiplomes"]
  ) => void;
}

export const useCandidatureStore = create<CandidatureStoreState>((set) => ({
  candidatureData: {
    // Personal Information
    personalInformation: {
      prenom: "",
      prenomAr: "",
      nom: "",
      nomAr: "",
      adresse: "",
      adresseAr: "",
      lieuNaissance: "",
      cin: "",
      dateNaissance: new Date(),
      sexe: "feminin", // default value, change as needed
      situation: "celibataire", // default value, change as needed
      telephone: "",
      email: "",
      experiences: {
        fonctionnaire: false,
        fonction: "",
        ppr: "",
        attestation: "",
      },
      situationDeHandicap: {
        handicap: false,
        typeHandicap: "",
      },
      files: null,
    },

    // Professional Information
    professionalInformation: {
      parcoursEtDiplomes: [
        {
          origine: "marocainPublic", // default value, change as needed
          intituleDiplome: "",
          diplomeType: "",
          anneeObtention: 0,
          specialite: "",
          mention: "",
          etablissement: "",
          diplomePdf: "",
        },
      ],
      niveauxLangues: [
        {
          langue: "",
          niveau: "basique", // default value, change as needed
          certificatLanguePdf: "",
        },
      ],
      experiencePedagogique: {
        experiencePedagogiqueEnHeures: 0,
      },
      publications: [
        {
          titre: "",
          anneePublication: 0,
          type: "",
          url: "",
          publicationPdf: "",
        },
      ],
      communications: [
        {
          titre: "",
          anneeCommunication: 0,
          url: "",
          communicationPdf: "",
        },
      ],
      residanat: {
        residanatPdf: "",
      },
    },
  },
  loading: false,
  error: "",

  setPersonalInformation: (data) => {
    set((state) => ({
      candidatureData: state.candidatureData
        ? {
            ...state.candidatureData,
            personalInformation: data,
          }
        : null,
    }));
  },

  setDiplomes: (data) => {
    set((state) => ({
      candidatureData: state.candidatureData
        ? {
            ...state.candidatureData,
            professionalInformation: {
              ...state.candidatureData.professionalInformation,
              parcoursEtDiplomes: data,
            },
          }
        : null,
    }));
  },
}));
