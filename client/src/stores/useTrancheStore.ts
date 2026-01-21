import { create } from "zustand";
import { trancheService, TrancheQueryParams } from "@/services/trancheService";
import {
  CreateTrancheData,
  Tranche,
  UpdateTrancheData,
  JobOfferSession,
} from "@/types/tranche.types";

interface TrancheStore {
  sessions: JobOfferSession[];
  isLoading: boolean;
  error: string | null;
  totalSessions: number;
  currentPage: number;
  totalPages: number;

  // Actions
  fetchJobOfferSessions: (
    jobOfferId: string,
    params?: TrancheQueryParams
  ) => Promise<void>;
  createTranche: (data: CreateTrancheData) => Promise<Tranche>;
  updateTranche: (id: string, data: UpdateTrancheData) => Promise<Tranche>;
  deleteTranche: (id: string) => Promise<void>;
}

export const useTrancheStore = create<TrancheStore>((set) => ({
  sessions: [],
  isLoading: false,
  error: null,
  totalSessions: 0,
  currentPage: 1,
  totalPages: 1,

  fetchJobOfferSessions: async (
    jobOfferId: string,
    params?: TrancheQueryParams
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await trancheService.getJobOfferSessions(
        jobOfferId,
        params
      );
      set({
        sessions: response.data,
        totalSessions: response.total,
        currentPage: response.page,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || "Failed to fetch sessions",
      });
    }
  },

  createTranche: async (data: CreateTrancheData) => {
    set({ isLoading: true, error: null });
    try {
      const newTranche = await trancheService.create(data);
      // We might need to refresh the list or manually update the state
      // Since tranches are nested in sessions, refreshing is safer/easier
      set({ isLoading: false });
      return newTranche;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || "Failed to create tranche",
      });
      throw error;
    }
  },

  updateTranche: async (id: string, data: UpdateTrancheData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTranche = await trancheService.update(id, data);
      set({ isLoading: false });
      return updatedTranche;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || "Failed to update tranche",
      });
      throw error;
    }
  },

  deleteTranche: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await trancheService.delete(id);
      set({ isLoading: false });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isLoading: false,
        error: err.response?.data?.message || "Failed to delete tranche",
      });
      throw error;
    }
  },
}));
