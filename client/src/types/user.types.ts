import { CandidatureType } from "./candidature.types";

export interface UserType {
  _id?: string;
  username: string;
  email: string;
  bio: string;
  role?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  avatar?: string;

  candiadature?: CandidatureType;
}
