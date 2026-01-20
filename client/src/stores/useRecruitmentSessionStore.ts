/* eslint-disable @typescript-eslint/no-explicit-any */
import { recruitmentSessionService } from "@/services/recruitmentSessionService";
import {
  CreateRecruitmentSession,
  RecruitmentSession,
  UpdateRecruitmentSession,
} from "@/types/recruitment-session.types";
import { toast } from "react-toastify";
import { create } from "zustand";

interface RecruitmentSessionState {
  sessions: RecruitmentSession[];
  loading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;
  createSession: (data: CreateRecruitmentSession) => Promise<void>;
  updateSession: (id: string, data: UpdateRecruitmentSession) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
}

export const useRecruitmentSession = create<RecruitmentSessionState>(
  (set, get) => ({
    sessions: [],
    loading: false,
    error: null,

    fetchSessions: async () => {
      set({ loading: true, error: null });
      try {
        const sessions = await recruitmentSessionService.getAllSessions();
        set({ sessions, loading: false });
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Failed to fetch sessions",
          loading: false,
        });
        // toast.error("Failed to fetch sessions");
      }
    },

    createSession: async (data: CreateRecruitmentSession) => {
      set({ loading: true, error: null });
      try {
        await recruitmentSessionService.createSession(data);
        await get().fetchSessions(); // Refresh list
        toast.success("Session created successfully");
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Failed to create session",
          loading: false,
        });
        toast.error(
          error.response?.data?.message || "Failed to create session"
        );
        throw error;
      }
    },

    updateSession: async (id: string, data: UpdateRecruitmentSession) => {
      set({ loading: true, error: null });
      try {
        await recruitmentSessionService.updateSession(id, data);
        await get().fetchSessions(); // Refresh list
        toast.success("Session updated successfully");
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Failed to update session",
          loading: false,
        });
        toast.error(
          error.response?.data?.message || "Failed to update session"
        );
        throw error;
      }
    },

    deleteSession: async (id: string) => {
      set({ loading: true, error: null });
      try {
        await recruitmentSessionService.deleteSession(id);
        await get().fetchSessions(); // Refresh list
        toast.success("Session deleted successfully");
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Failed to delete session",
          loading: false,
        });
        toast.error(
          error.response?.data?.message || "Failed to delete session"
        );
        throw error;
      }
    },
  })
);
