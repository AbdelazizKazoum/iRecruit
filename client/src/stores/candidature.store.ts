import { CandidatureType } from "@/types/candidature.types";
import { create } from "zustand";

export interface CandidatureStoreState {
  candidatureData: CandidatureType;
  loading: boolean;
  error: string;

  setPersonalInformation: (
    data: CandidatureType["personalInformation"]
  ) => void;
  setDiplomes: (
    data: CandidatureType["professionalInformation"]["parcoursEtDiplomes"]
  ) => void;
}

export const useCandidatureStore = create((set) => ({
  candidatureData: {},
  loading: false,
  error: "",

  setPersonalInformation : (data: CandidatureType["personalInformation"])=> {
    try {
        const res = 
        
    } catch (error) {
        
    }

  }

}));
