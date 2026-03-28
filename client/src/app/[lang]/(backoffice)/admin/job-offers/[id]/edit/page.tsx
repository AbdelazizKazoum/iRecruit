import React from "react";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import JobOfferForm from "@/app/[lang]/(backoffice)/admin/job-offers/components/JobOfferForm";

interface EditJobOfferPageProps {
  params: { lang: Locale; id: string };
}

export default async function EditJobOfferPage({
  params: { lang, id },
}: EditJobOfferPageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <JobOfferForm
        dictionary={dictionary}
        lang={lang}
        mode="edit"
        jobOfferId={id}
      />
    </div>
  );
}
