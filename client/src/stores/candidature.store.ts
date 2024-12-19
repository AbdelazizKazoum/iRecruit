import clientApi from "@/libs/clientApi";
import {
  CandidatureType,
  ParcoursEtDiplomesTypes,
} from "@/types/candidature.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface CandidatureStoreState {
  candidatureData: CandidatureType | null;
  loading: boolean;
  error: string;

  setPersonalInformation: (
    data: CandidatureType["personalInformation"]
  ) => void;
  setDiplomes: (data: ParcoursEtDiplomesTypes) => void;
  fetchDiplomes: () => Promise<void>;
  doesDiplomeExist: (diplomeType: string) => boolean;
  submitDiplome: (diplome: FormData) => Promise<void>;
  submitPersonalInformation: (data: FormData) => Promise<void>;
  fetchCandidatureData: () => Promise<void>;
}

export const useCandidatureStore = create<CandidatureStoreState>(
  (set, get) => ({
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

    fetchCandidatureData: async () => {
      set({ loading: true, error: "" });
      try {
        const response = await clientApi.get("/candidature/mine");
        const data = response.data as CandidatureType;
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
                parcoursEtDiplomes: [
                  ...(state.candidatureData.professionalInformation
                    ?.parcoursEtDiplomes || []),
                  data,
                ],
              },
            }
          : null,
      }));
    },

    fetchDiplomes: async () => {
      set({ loading: true, error: "" });
      try {
        const response = await clientApi.get("/candidature/diplomes");
        const diplomas = response.data as ParcoursEtDiplomesTypes[];
        set((state) => ({
          candidatureData: state.candidatureData
            ? {
                ...state.candidatureData,
                professionalInformation: {
                  ...state.candidatureData.professionalInformation,
                  parcoursEtDiplomes: diplomas,
                },
              }
            : null,
          loading: false,
        }));
        toast.success("Diplomas fetched successfully!");
      } catch (error) {
        console.error("Error fetching diplomas:", error);
        set({
          loading: false,
          error: "Failed to fetch diplomas. Please try again.",
        });
        toast.error("Failed to fetch diplomas. Please try again.");
      }
    },

    doesDiplomeExist: (diplomeType) => {
      const state = get();
      const diplomas =
        state.candidatureData?.professionalInformation.parcoursEtDiplomes || [];
      return diplomas.some((diplome) => diplome.diplomeType === diplomeType);
    },

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
                  parcoursEtDiplomes: [
                    ...(state.candidatureData.professionalInformation
                      ?.parcoursEtDiplomes || []),
                    ...response.data,
                  ],
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
  })
);
