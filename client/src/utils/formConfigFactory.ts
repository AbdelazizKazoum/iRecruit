// src/utils/formConfigFactory.ts

import * as formConfigs from "@/configs/formConfigs";

export const formConfigFactory = (category: string) => {
  switch (category) {
    case "candidate":
      return formConfigs.candidateFormConfig;
    case "info-professionnelles":
      return formConfigs.infoProfessionnellesFormConfig;
    // Add more categories as needed
    default:
      throw new Error(`Unknown form category: ${category}`);
  }
};
