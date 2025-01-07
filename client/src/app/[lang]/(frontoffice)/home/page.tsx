import React from "react";
import Hero from "@/components/home/Hero";
import Etapes from "@/components/home/Etapes";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";

const Page = async ({ params }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <Hero dictionary={dictionary} locale={params.lang} />
      {process.env.NEXT_PUBLIC_BACKEND_API}
      <Etapes locale={params.lang} dictionary={dictionary} />
    </>
  );
};

export default Page;
