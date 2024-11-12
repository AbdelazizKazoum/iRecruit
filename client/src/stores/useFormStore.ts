/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/useFormStore.ts

import { create } from "zustand";

interface FormState {
  formData: { [key: string]: any };
  setFormData: (category: string, value: any) => void;
  resetFormData: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {},
  setFormData: (category, data) =>
    set((state) => ({
      formData: { ...state.formData, [category]: data },
    })),
  resetFormData: () => set({ formData: {} }),
}));
