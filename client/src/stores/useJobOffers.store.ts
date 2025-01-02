/* eslint-disable @typescript-eslint/no-explicit-any */
import clientApi from "@/libs/clientApi";
import { OfferType } from "@/types/application.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface JobOfferStoreState {
  jobOffers: OfferType[] | null;
  selectedOffer: OfferType | null;
  loading: boolean;
  error: string;

  createOffer: (data: OfferType) => void; // Fixed typo here
  fetchOffers: () => Promise<void>; // Update to not return data but set state directly
}

export const useJobOffersStore = create<JobOfferStoreState>((set) => ({
  jobOffers: null,
  selectedOffer: null,
  loading: false,
  error: "",

  // Set application data to the store
  createOffer: (data) => {
    set((state) => ({
      jobOffers: state.jobOffers ? [...state.jobOffers, data] : [data],
    }));
  },

  // Fetch job offers from the API
  fetchOffers: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.get("job-offers");
      set({ jobOffers: response.data, loading: false });
      toast.success("Job offers fetched successfully!");
    } catch (error) {
      console.error("Error fetching job offers:", error);
      set({
        loading: false,
        error: "Failed to fetch job offers. Please try again.",
      });
      toast.error("Failed to fetch job offers. Please try again.");
    }
  },
}));
