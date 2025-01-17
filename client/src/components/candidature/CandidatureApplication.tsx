"use client";
import React, { useEffect, useState } from "react";
import { Locale } from "@/configs/i18n";
import InfoProfessionnelles from "./info-professionnelles/Index";
import InfoPersonnelles from "./info-personnelles/InfoPersonnellesForm";
import { useCandidatureStore } from "@/stores/candidature.store";
import { getDictionary } from "@/utils/getDictionary";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/libs/utils";

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

  if (loading)
    return (
      <nav className={cn("grid grid-cols-2 gap-6  m-auto w-full")}>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </nav>
    );

  return (
    <main className="flex-1">
      {section === "info-personnelles" && (
        <InfoPersonnelles locale={locale} dictionary={dictionary} />
      )}
      {section === "info-professionnelles" && (
        <InfoProfessionnelles locale={locale} dictionary={dictionary} />
      )}
    </main>
  );
};
