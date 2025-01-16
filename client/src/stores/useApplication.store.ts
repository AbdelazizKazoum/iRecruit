/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clientApi from "@/libs/clientApi";
import { ApplicationType, OfferType } from "@/types/application.types";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface ApplicationStoreState {
  applicationData: ApplicationType | null;
  selectedOffer: OfferType | null;
  applications: ApplicationType[] | null;
  loading: boolean;
  error: string;

  setApplication: (data: ApplicationType) => void;
  setOffer: (data: OfferType) => void;
  submitApplication: (data: ApplicationType) => Promise<string>;
  fetchApplications: () => Promise<string>;
}

export const useApplicationStore = create<ApplicationStoreState>((set) => ({
  applicationData: null,
  selectedOffer: null,
  applications: null,
  loading: false,
  error: "",

  // set application data to the store
  setApplication: (data) => {
    set({
      applicationData: data,
    });
  },

  // set application data to the store
  setOffer: (data) => {
    set({
      selectedOffer: data,
    });
  },

  // Submit Publications to database
  submitApplication: async (data: ApplicationType) => {
    set({ loading: true, error: "" });
    const { attachment, ...rest } = data; // Destructure to separate files from other data

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(rest));

      Object.entries(attachment).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + `.${file.name.split(".")[1]}`;

        formData.append("attachment", file, key);
      });

      const response = await clientApi.post("application", formData);
      set({ applicationData: response.data });
      toast.success("submitted successfully!");
      return "success";
    } catch (error) {
      console.error("Error submitting", error);
      set({
        loading: false,
        error: "Failed to submit. Please try again.",
      });
      toast.error("Failed to submit. Please try again.");
      return "error";
    }
  },

  // Submit Publications to database
  fetchApplications: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await clientApi.get("application/mine");

      set({ applications: response.data });
      return "success";
    } catch (error) {
      set({
        error: "Failed to submit. Please try again.",
      });
      return "error";
    } finally {
      set({ loading: false });
    }
  },
}));
