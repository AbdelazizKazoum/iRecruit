import clientApi from "@/libs/clientApi";
import {
  CreateRecruitmentSession,
  RecruitmentSession,
  UpdateRecruitmentSession,
} from "@/types/recruitment-session.types";

export const recruitmentSessionService = {
  getAllSessions: async function () {
    const { data } = await clientApi.get<RecruitmentSession[]>(
      "/recruitment-session"
    );
    return data;
  },

  getSessionById: async function (id: string) {
    const { data } = await clientApi.get<RecruitmentSession>(
      `/recruitment-session/${id}`
    );
    return data;
  },

  createSession: async function (sessionData: CreateRecruitmentSession) {
    const { data } = await clientApi.post<RecruitmentSession>(
      "/recruitment-session",
      sessionData
    );
    return data;
  },

  updateSession: async function (
    id: string,
    sessionData: UpdateRecruitmentSession
  ) {
    const { data } = await clientApi.put<RecruitmentSession>(
      `/recruitment-session/${id}`,
      sessionData
    );
    return data;
  },

  deleteSession: async function (id: string) {
    const { data } = await clientApi.delete<void>(`/recruitment-session/${id}`);
    return data;
  },
};
