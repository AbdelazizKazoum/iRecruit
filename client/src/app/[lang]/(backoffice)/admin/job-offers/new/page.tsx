import React from "react";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import JobOfferForm from "@/app/[lang]/(backoffice)/admin/job-offers/components/JobOfferForm";

interface NewJobOfferPageProps {
  params: { lang: Locale };
}

export default async function NewJobOfferPage({
  params: { lang },
}: NewJobOfferPageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <JobOfferForm dictionary={dictionary} lang={lang} mode="create" />
    </div>
  );
}
