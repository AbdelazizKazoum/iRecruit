import { CandidatureType } from "./candidature.types";

export interface UserType {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  bio: string;

  candiadature?: CandidatureType;
}
