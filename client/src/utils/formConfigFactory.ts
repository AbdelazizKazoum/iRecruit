// src/utils/formConfigFactory.ts

import * as formConfigs from "@/configs/formConfigs";

export const formConfigFactory = (category: string) => {
  switch (category) {
    case "candidate":
      return formConfigs.candidateFormConfig;
    case "info-professionnelles":
    // Add more categories as needed
    case "diplomes":
      return formConfigs.diplomesFormConfig;
    case "langues":
      return formConfigs.languesFormConfig;
    case "publications":
      return formConfigs.publicationsFormConfig;
    case "communications":
      return formConfigs.communicationsFormConfig;
    // Add more categories as needed
    default:
      throw new Error(`Unknown form category: ${category}`);
  }
};
