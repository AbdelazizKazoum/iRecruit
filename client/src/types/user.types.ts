import { CandidatureType } from "./candidature.types";

export interface UserType {
  _id?: string;
  username: string;
  email: string;
  bio: string;

  candiadature?: CandidatureType;
}
