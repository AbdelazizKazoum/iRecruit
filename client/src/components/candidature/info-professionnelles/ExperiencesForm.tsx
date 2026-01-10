/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { experiencesSchema } from "@/schemas/experiences.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { ExperienceType } from "@/types/candidature.types";
import React from "react";

const ExperiencesForm = ({ locale }: { locale: Locale }) => {
  const { candidatureData, submitExperience, setNextGroup } =
    useCandidatureStore();

  const onSubmit = async (data: ExperienceType) => {
    // Normalize highlights (string -> array split by newline)
    const highlights =
      typeof data.highlights === "string"
        ? data.highlights
            .split("\n")
            .map((h) => h.trim())
            .filter(Boolean)
        : data.highlights;

    return await submitExperience({ ...data, highlights });
  };

  const handleNext = (value?: string) => {
    setNextGroup(value ?? "Diplômes");
  };

  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="experiences"
        schema={experiencesSchema}
        locale={locale}
        data={candidatureData?.professionalInformation?.experiences || []}
        checkKey="position"
        handleNext={handleNext}
      />
    </div>
  );
};

export default ExperiencesForm;
