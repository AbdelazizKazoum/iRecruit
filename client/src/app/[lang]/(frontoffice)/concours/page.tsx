/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConcourItem } from "@/components/concours/ConcourItem";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { OfferType } from "@/types/application.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const Concours = async ({ params }: { params: { lang: Locale } }) => {
  // Get the dictionary for translations
  const dictionary = await getDictionary(params.lang);

  // Fetch job offers from the API
  const response = await fetch(`${process.env.BACKEND_API}/job-offers`); // Update with your actual API endpoint
  const jobOffers: OfferType[] = await response.json(); // Parse the JSON response

  const { lang: locale } = params;

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["concours"].title}
          description={dictionary["concours"].description}
        />
        <Separator className="my-6" />
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none">
            <div className="relative">
              <div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 pb-4 ">
                  {jobOffers.map((item: OfferType) => (
                    <ConcourItem
                      offer={item}
                      dictionary={dictionary}
                      key={item.title[locale]}
                      className=""
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concours;
