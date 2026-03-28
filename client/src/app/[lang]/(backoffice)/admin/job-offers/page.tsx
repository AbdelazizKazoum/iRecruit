/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { JobOffersClient } from "./components/JobOffersClient";

interface OffersPageProps {
  params: {
    lang: Locale;
  };
}

export default async function OffersPage({
  params: { lang },
}: OffersPageProps) {
  const dictionary = await getDictionary(lang);

  return <JobOffersClient dictionary={dictionary} lang={lang} />;
}
