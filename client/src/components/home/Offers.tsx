import React from "react";
import { getActiveTranches } from "@/libs/actions/tranches"; // Fetch active tranches for open positions.
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche shape for cards.
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { ConcourItem } from "@/components/concours/ConcourItem";
import Link from "next/link";
import ButtonPrimary from "../misc/ButtonPrimary";

const Offers = async ({
  dictionary,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) => {
  // Load active tranches instead of generic job offers.
  const activeTranches = await getActiveTranches();
  // Limit the home section to the first 4 active tranches.
  const limitedTranches = activeTranches.slice(0, 4);

  return (
    <div className="bg-white-300 py-24">
      <div className="max-w-screen-2xl px-8 xl:px-16 mx-auto">
        <div className="flex flex-col justify-center items-center text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-black-600 leading-normal mb-4">
            {dictionary["concours"].title}
          </h2>
          <p className="text-black-500 max-w-2xl">
            {dictionary["concours"].description}
          </p>
        </div>
        {limitedTranches.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 pb-4">
            {/* Render active tranche cards for the home section */}
            {limitedTranches.map((item: ActiveTranche) => (
              <ConcourItem
                tranche={item}
                dictionary={dictionary}
                key={item._id}
                className="transform hover:scale-105 transition-transform duration-300"
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-black-500">
            {dictionary["concours"].noOffers}
          </p>
        )}
        {activeTranches.length > 4 && (
          <div className="flex justify-center mt-12">
            <Link href={`/${locale}/concours`}>
              <ButtonPrimary addClass="" onClick={null} disabled={false}>
                {dictionary.buttons.showMore || "Show More"}
              </ButtonPrimary>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
