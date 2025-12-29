/* eslint-disable @typescript-eslint/no-explicit-any */
import clientApi from "@/libs/clientApi";
import { OfferType } from "@/types/application.types";
import { toast } from "react-toastify";
import { create } from "zustand";
import { jobOffersService } from "@/services/jobOffersService";

export interface JobOfferStoreState {
  jobOffers: OfferType[];
  selectedOffer: OfferType | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string;

  createOffer: (data: OfferType) => void;
  fetchOffers: () => Promise<void>;
  fetchJobOffers: (params?: {
    page?: number;
    limit?: number;
    title?: string;
    date?: string;
    city?: string;
    department?: string;
  }) => Promise<{
    data: OfferType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>;
}

export const useJobOffersStore = create<JobOfferStoreState>((set) => ({
  jobOffers: [],
  selectedOffer: null,
  pagination: null,
  loading: false,
  error: "",

  // Set application data to the store
  createOffer: (data) => {
    set((state) => ({
      jobOffers: [...state.jobOffers, data],
    }));
  },

  // Fetch job offers from the API (original method for public offers)
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

  // Fetch job offers with pagination and filters
  fetchJobOffers: async (params) => {
    try {
      set({ loading: true });
      const result = await jobOffersService.getAllJobOffers(params);
      set({
        jobOffers: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      });
      return result;
    } catch (error) {
      toast(error instanceof Error ? error.message : "An error occurred");
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
