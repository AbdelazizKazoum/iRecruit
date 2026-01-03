import { ConcoursSearchList } from "@/components/concours/ConcoursSearchList";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getJobOffers } from "@/libs/actions/offers";
import { OfferType } from "@/types/application.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const Concours = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: {
    q?: string;
    region?: string;
    published?: string;
    page?: string;
  };
}) => {
  // Get the dictionary for translations
  const dictionary = await getDictionary(params.lang);

  const { lang: locale } = params;
  const page = Number(searchParams?.page) || 1;
  const { data: jobOffers, total, limit } = await getJobOffers({
    search: searchParams?.q,
    region: searchParams?.region,
    published: searchParams?.published,
    page,
    limit: 12,
  });

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
            <ConcoursSearchList
              offers={jobOffers as OfferType[]}
              dictionary={dictionary}
              locale={locale}
              total={total}
              page={page}
              limit={limit}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concours;
