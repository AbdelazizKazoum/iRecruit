export interface RecruitmentSession {
  _id: string;
  yearLabel: string;
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecruitmentSession {
  yearLabel: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface UpdateRecruitmentSession {
  yearLabel?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  description?: string;
}
