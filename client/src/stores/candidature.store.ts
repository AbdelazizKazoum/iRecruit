import clientApi from "@/libs/clientApi";
import { CandidatureType } from "@/types/candidature.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface CandidatureStoreState {
  candidatureData: CandidatureType | null;
  loading: boolean;
  error: string;

  setPersonalInformation: (
    data: CandidatureType["personalInformation"]
  ) => void;
  submitDiplome: (diplome: FormData) => Promise<void>;
  submitNiveauxLangues: (niveauxLangues: FormData) => Promise<void>;
  submitPersonalInformation: (data: FormData) => Promise<void>;
  fetchCandidatureData: () => Promise<void>;
}

export const useCandidatureStore = create<CandidatureStoreState>((set) => ({
  candidatureData: {
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
      sexe: "feminin",
      situation: "celibataire",
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
    professionalInformation: {
      parcoursEtDiplomes: [],
      niveauxLangues: [],
      experiencePedagogique: {
        experiencePedagogiqueEnHeures: 0,
      },
      publications: [],
      communications: [],
      residanat: {
        residanatPdf: "",
      },
    },
  },
  loading: false,
  error: "",

  // fetch candidature from database
  fetchCandidatureData: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.get("/candidature/mine");
      const data = response.data as CandidatureType;
      console.log("🚀 ~ fetchCandidatureData: ~ data:", data);

      set({
        candidatureData: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching candidature data:", error);
      set({
        loading: false,
        error: "Failed to fetch candidature data. Please try again.",
      });
      toast.error("Failed to fetch candidature data. Please try again.");
    }
  },

  // Submit the candidature personal information to database
  submitPersonalInformation: async (data) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post(
        "/candidature/personal-informations",
        data
      );
      const updatedData = response.data as CandidatureType;
      set({
        candidatureData: updatedData,
        loading: false,
      });
      toast.success("Personal information submitted successfully!");
    } catch (error) {
      console.error("Error submitting personal information:", error);
      set({
        loading: false,
        error: "Failed to submit personal information. Please try again.",
      });
      toast.error("Failed to submit personal information. Please try again.");
    }
  },

  // set candidature data to the store
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

  // Submit diplome to database
  submitDiplome: async (diplome) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post("candidature/diplomes", diplome);
      set((state) => ({
        candidatureData: state.candidatureData
          ? {
              ...state.candidatureData,
              professionalInformation: {
                ...state.candidatureData.professionalInformation,
                parcoursEtDiplomes: response.data,
              },
            }
          : null,
        loading: false,
      }));
      toast.success("Diploma submitted successfully!");
    } catch (error) {
      console.error("Error submitting diploma:", error);
      set({
        loading: false,
        error: "Failed to submit diploma. Please try again.",
      });
      toast.error("Failed to submit diploma. Please try again.");
    }
  },

  // Submit niveauxLangues to database
  submitNiveauxLangues: async (niveauxLangues: FormData) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post(
        "candidature/niveaux-langues",
        niveauxLangues
      );
      set((state) => ({
        candidatureData: state.candidatureData
          ? {
              ...state.candidatureData,
              professionalInformation: {
                ...state.candidatureData.professionalInformation,
                niveauxLangues: response.data,
              },
            }
          : null,
        loading: false,
      }));
      toast.success("Language levels submitted successfully!");
    } catch (error) {
      console.error("Error submitting language levels:", error);
      set({
        loading: false,
        error: "Failed to submit language levels. Please try again.",
      });
      toast.error("Failed to submit language levels. Please try again.");
    }
  },
}));
