"use client";
import React, { useEffect, useState } from "react";
import { Locale } from "@/configs/i18n";
import InfoProfessionnelles from "./info-professionnelles/Index";
import InfoPersonnelles from "./info-personnelles/InfoPersonnellesForm";
import { useCandidatureStore } from "@/stores/candidature.store";
import { getDictionary } from "@/utils/getDictionary";

export const CandidatureApplication = ({
  section,
  locale,
  dictionary,
}: {
  section: string;
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const { fetchCandidatureData } = useCandidatureStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchCandidatureData();
      setLoading(false);
    })();
  }, [fetchCandidatureData]);

  if (loading) return <>loading ...</>;

  return (
    <main className="flex-1">
      {section === "info-personnelles" && <InfoPersonnelles locale={locale} />}
      {section === "info-professionnelles" && (
        <InfoProfessionnelles locale={locale} dictionary={dictionary} />
      )}
    </main>
  );
};
