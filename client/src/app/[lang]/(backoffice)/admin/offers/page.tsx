import React from "react";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { Briefcase } from "lucide-react";
import { JobOffersTable } from "@/components/Layout/admin/offers/JobOffersTable";

interface OffersPageProps {
  params: {
    lang: Locale;
  };
}

export default async function OffersPage({ params: { lang } }: OffersPageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {dictionary.offersPage.title}
          </h1>
        </div>
        <p className="text-muted-foreground ml-14">
          {dictionary.offersPage.subtitle}
        </p>
      </div>

      {/* Job Offers Table Component */}
      <JobOffersTable dictionary={dictionary} lang={lang} />
    </div>
  );
}
