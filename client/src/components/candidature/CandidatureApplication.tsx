"use client";
import React from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";
import { candidateFormSchema } from "@/schemas/candidateFormSchema";
import { infoProfessionnellesValidationSchema } from "@/schemas/infoProfessionnellesValidationSchema";
import { Locale } from "@/configs/i18n";

export const CandidatureApplication = ({
  section,
  local,
}: {
  section: string;
  local: Locale;
}) => {
  return (
    <main className="flex-1 ">
      {section === "info-personnelles" && (
        <DynamicNormalForm
          category="candidate"
          schema={candidateFormSchema}
          local={local}
        />
      )}
      {section === "info-professionnelles" && (
        <DynamicNormalForm
          category="info-professionnelles"
          schema={infoProfessionnellesValidationSchema}
          local={local}
        />
      )}
    </main>
  );
};
