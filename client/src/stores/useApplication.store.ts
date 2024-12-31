import clientApi from "@/libs/clientApi";
import { CandidatureType } from "@/types/candidature.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface CandidatureStoreState {
  applicationData: CandidatureType | null;
  loading: boolean;
  error: string;

  submitPublications: (publications: FormData) => Promise<void>;
}

export const useCandidatureStore = create<CandidatureStoreState>((set) => ({
  applicationData: null,
  loading: false,
  error: "",

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
}));
