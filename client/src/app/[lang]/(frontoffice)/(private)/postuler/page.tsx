import Stepper from "@/components/application/Stepper";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const JobOfferPosting = async ({
  params,
}: {
  searchParams: { section: string };
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["candidature"].title}
          description={dictionary["candidature"].description}
        />
        <Separator className="my-6" />
        <Stepper locale={params.lang} dictionary={dictionary} />
      </div>
    </div>
  );
};

export default JobOfferPosting;
