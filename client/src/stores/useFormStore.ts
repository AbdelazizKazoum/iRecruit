/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/useFormStore.ts

import { create } from "zustand";

interface FormState {
  formData: { [key: string]: any };
  setFormData: (category: string, fieldName: string, value: any) => void;
  resetFormData: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {},
  setFormData: (category, fieldName, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [category]: { ...state.formData[category], [fieldName]: value },
      },
    })),
  resetFormData: () => set({ formData: {} }),
}));
