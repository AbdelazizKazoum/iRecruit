import { RecruitmentSession } from "./recruitment-session.types";

export interface Tranche {
  _id: string;
  name: string;
  session: RecruitmentSession | string;
  jobOffer: string;
  // Alias for jobOffer to support legacy components
  jobOfferId?: string;
  startDate: string;
  endDate: string;
  isOpen: boolean;
  maxCandidates?: number;
  currentCandidates: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTrancheData {
  name: string;
  session: string;
  jobOffer: string;
  startDate: string;
  endDate: string;
  isOpen?: boolean;
  maxCandidates?: number;
}

export type UpdateTrancheData = Partial<CreateTrancheData>;

export interface JobOfferSession extends RecruitmentSession {
  tranches: Tranche[];
}
