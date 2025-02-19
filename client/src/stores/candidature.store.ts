import clientApi from "@/libs/clientApi";
import { CandidatureType } from "@/types/candidature.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface CandidatureStoreState {
  candidatureData: CandidatureType | null;
  loading: boolean;
  error: string | null;
  nextGroup: string;

  setPersonalInformation: (
    data: CandidatureType["personalInformation"]
  ) => void;
  submitDiplome: (diplome: FormData) => Promise<void>;
  submitNiveauxLangues: (niveauxLangues: FormData) => Promise<void>;
  submitPublications: (publications: FormData) => Promise<void>;
  submitCommunication: (communication: FormData) => Promise<void>;
  submitPersonalInformation: (data: FormData) => Promise<void>;
  fetchCandidatureData: () => Promise<CandidatureType | null>;
  validateCandidature: () => Promise<string>; // New validation method
  setNextGroup: (value: string) => void; // New validation method
}

export const useCandidatureStore = create<CandidatureStoreState>((set) => ({
  candidatureData: null,
  loading: false,
  error: "",
  nextGroup: "",

  // Set next form in the dynamic group forms
  setNextGroup: (value) => {
    set({ nextGroup: value });
  },

  // fetch candidature from database
  fetchCandidatureData: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.get("/candidature/mine");
      const data = response.data as CandidatureType;

      set({
        candidatureData: data,
        loading: false,
      });
      return data;
    } catch (error) {
      set({
        loading: false,
        error: error
          ? "Failed to fetch candidature data. Please try again."
          : null,
      });
      return null;
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

  // Submit Publications to database
  submitPublications: async (publications: FormData) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post(
        "candidature/publications",
        publications
      );
      set((state) => ({
        candidatureData: state.candidatureData
          ? {
              ...state.candidatureData,
              professionalInformation: {
                ...state.candidatureData.professionalInformation,
                publications: response.data,
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

  // Submit Publications to database
  submitCommunication: async (communication: FormData) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post(
        "candidature/communications",
        communication
      );
      set((state) => ({
        candidatureData: state.candidatureData
          ? {
              ...state.candidatureData,
              professionalInformation: {
                ...state.candidatureData.professionalInformation,
                communications: response.data,
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

  // Validate the candidature
  validateCandidature: async () => {
    try {
      const response = await clientApi.get("/candidature/validate");
      const candidature = response.data as CandidatureType;
      set({
        candidatureData: candidature,
      });
      toast.success("La candidature a été validée avec succès.");
      return "success";
    } catch (error) {
      console.error("Error validating candidature:", error);
      set({
        error: "Failed to validate candidature. Please try again.",
      });
      toast.error("Failed to validate candidature. Please try again.");
      return "error";
    }
  },
}));
