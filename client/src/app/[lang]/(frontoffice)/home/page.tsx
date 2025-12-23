import React from "react";
import Hero from "@/components/home/Hero";
import Etapes from "@/components/home/Etapes";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import Offers from "@/components/home/Offers";

const Page = async ({ params }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <Hero dictionary={dictionary} locale={params.lang} />
      <Etapes locale={params.lang} dictionary={dictionary} />
      <Offers dictionary={dictionary} locale={params.lang} />
    </>
  );
};

export default Page;
