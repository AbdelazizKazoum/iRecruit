/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clientApi from "@/libs/clientApi";
import { ApplicationType, OfferType } from "@/types/application.types";
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche context for applications.
import { toast } from "react-toastify";
import { create } from "zustand";

export interface ApplicationStoreState {
  applicationData: ApplicationType | null;
  selectedOffer: OfferType | null;
  selectedTranche: ActiveTranche | null; // Active tranche selected by the candidate.
  applications: ApplicationType[] | null;
  loading: boolean;
  error: string;

  setApplication: (data: ApplicationType) => void;
  setOffer: (data: OfferType) => void;
  setTranche: (data: ActiveTranche) => void; // Store tranche context for the apply flow.
  submitApplication: (data: ApplicationType) => Promise<string>;
  fetchApplications: () => Promise<string>;
  acceptApplication: (applicationId: string, message: string) => Promise<string>;
  rejectApplication: (applicationId: string) => Promise<string>;
}

export const useApplicationStore = create<ApplicationStoreState>((set, get) => ({
  applicationData: null,
  selectedOffer: null,
  selectedTranche: null, // Initialize tranche state as empty.
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

  // set tranche context to the store
  setTranche: (data) => {
    set({
      selectedTranche: data,
    });
  },

  // Submit Publications to database
  submitApplication: async (data: ApplicationType) => {
    set({ loading: true, error: "" });
    const { attachment, ...rest } = data; // Destructure to separate files from other data
    const selectedTranche = get().selectedTranche; // Read tranche context if payload is missing it.
    const payload = {
      ...rest,
      trancheId: rest.trancheId || selectedTranche?._id, // Ensure tranche id is included.
    };

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(payload)); // Send payload with tranche id.

      Object.entries(attachment).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + `.${file.name.split(".")[1]}`;

        formData.append("attachment", file, key);
      });

      const response = await clientApi.post("application", formData);
      set({ applicationData: response.data, loading: false });
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

  // Accept application
  acceptApplication: async (applicationId: string, message: string) => {
    set({ loading: true, error: "" });
    try {
      await clientApi.patch(`application/${applicationId}/accept`, { message });
      toast.success("Application accepted and email sent!");
      return "success";
    } catch (error) {
      console.error("Error accepting application", error);
      set({
        loading: false,
        error: "Failed to accept application. Please try again.",
      });
      toast.error("Failed to accept application. Please try again.");
      return "error";
    } finally {
      set({ loading: false });
    }
  },

  // Reject application
  rejectApplication: async (applicationId: string) => {
    set({ loading: true, error: "" });
    try {
      await clientApi.patch(`application/${applicationId}/reject`);
      toast.success("Application rejected!");
      return "success";
    } catch (error) {
      console.error("Error rejecting application", error);
      set({
        loading: false,
        error: "Failed to reject application. Please try again.",
      });
      toast.error("Failed to reject application. Please try again.");
      return "error";
    } finally {
      set({ loading: false });
    }
  },
}));
