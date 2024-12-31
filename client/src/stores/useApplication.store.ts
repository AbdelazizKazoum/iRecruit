/* eslint-disable @typescript-eslint/no-explicit-any */
import clientApi from "@/libs/clientApi";
import { ApplicationType, OfferType } from "@/types/application.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface ApplicationStoreState {
  applicationData: ApplicationType | null;
  selectedOffer: OfferType | null;
  loading: boolean;
  error: string;

  setApplication: (data: ApplicationType) => void;
  setOffer: (data: OfferType) => void;
  submitApplication: (data: FormData) => Promise<void>;
}

export const useApplicationStore = create<ApplicationStoreState>((set) => ({
  applicationData: null,
  selectedOffer: null,
  loading: false,
  error: "",

  // set application data to the store
  setApplication: (data) => {
    set({
      applicationData: data,
    });
  },

  // set application data to the store
  setOffer: (data) => {
    set({
      selectedOffer: data,
    });
  },

  // Submit Publications to database
  submitApplication: async (data: FormData) => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.post("application", data);
      set({ applicationData: response.data });
      toast.success("submitted successfully!");
    } catch (error) {
      console.error("Error submitting", error);
      set({
        loading: false,
        error: "Failed to submit. Please try again.",
      });
      toast.error("Failed to submit. Please try again.");
    }
  },
}));
