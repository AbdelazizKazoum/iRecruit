import api from "@/libs/clientApi";
import {
  CreateTrancheData,
  Tranche,
  UpdateTrancheData,
  JobOfferSession,
} from "@/types/tranche.types";
import { PaginationResponse } from "@/types/pagination.types";

export interface TrancheQueryParams {
  page?: number;
  limit?: number;
  session?: string;
  date?: string;
  name?: string;
  isOpen?: boolean;
}

export const trancheService = {
  create: async (data: CreateTrancheData): Promise<Tranche> => {
    const response = await api.post<Tranche>("/tranche", data);
    return response.data;
  },

  getAll: async (
    params?: TrancheQueryParams
  ): Promise<PaginationResponse<Tranche>> => {
    const response = await api.get<PaginationResponse<Tranche>>("/tranche", {
      params,
    });
    return response.data;
  },

  getJobOfferSessions: async (
    jobOfferId: string,
    params?: TrancheQueryParams
  ): Promise<PaginationResponse<JobOfferSession>> => {
    const response = await api.get<PaginationResponse<JobOfferSession>>(
      `/tranche/job-offer/${jobOfferId}/sessions`,
      { params }
    );
    return response.data;
  },

  getOne: async (id: string): Promise<Tranche> => {
    const response = await api.get<Tranche>(`/tranche/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateTrancheData): Promise<Tranche> => {
    const response = await api.put<Tranche>(`/tranche/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tranche/${id}`);
  },
};
