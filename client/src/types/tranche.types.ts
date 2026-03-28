import { OfferType } from "./application.types"; // Offer payload used in active tranche responses.
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

// Active tranche shape returned by the /tranche/active endpoint.
export interface ActiveTranche {
  _id: string; // Tranche id from the backend.
  name: string; // Tranche display name.
  session: RecruitmentSession; // Populated session for year label.
  jobOffer: OfferType; // Populated job offer data for cards/details.
  startDate: string; // Tranche start date (ISO string).
  endDate: string; // Tranche end date (ISO string).
  isOpen: boolean; // Indicates if the tranche is currently open.
  maxCandidates?: number; // Optional tranche capacity.
  createdAt?: string; // Optional created timestamp.
  updatedAt?: string; // Optional updated timestamp.
}
