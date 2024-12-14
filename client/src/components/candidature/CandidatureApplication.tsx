"use client";
import React from "react";
import { Locale } from "@/configs/i18n";
import InfoProfessionnelles from "./info-professionnelles/Index";
import InfoPersonnelles from "./info-personnelles/InfoPersonnellesForm";

export const CandidatureApplication = ({
  section,
  locale,
}: {
  section: string;
  locale: Locale;
}) => {
  return (
    <main className="flex-1">
      {section === "info-personnelles" && <InfoPersonnelles locale={locale} />}
      {section === "info-professionnelles" && (
        <InfoProfessionnelles locale={locale} />
      )}
    </main>
  );
};
