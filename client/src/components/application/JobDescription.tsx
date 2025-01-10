/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/configs/i18n";
import { OfferType } from "@/types/application.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const JobOfferCard = ({
  offer,
  locale,
  dictionary,
}: {
  offer: OfferType | null;
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  if (!offer) {
    return (
      <div className="flex items-center justify-center min-h-60 ">
        <p className="text-center text-black-600/80 text-lg font-medium">
          {dictionary.application.noOfferSelected}{" "}
        </p>
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="bg-gray-200 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold text-primary">
          {offer.title[locale]}
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="text-muted-foreground">
            <strong className="mr-3 text-black-600/70">
              {" "}
              {dictionary.application.city}{" "}
            </strong>{" "}
            {offer.city[locale]}
          </span>
          <span className="text-muted-foreground">
            <strong className="mr-3 text-black-600/70">
              {dictionary.application.department}{" "}
            </strong>{" "}
            {offer.department[locale]}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          <strong className="mr-3 text-black-600/70">
            {dictionary.application.candidatesNumber}{" "}
          </strong>{" "}
          {offer.candidatesNumber}
        </div>
        <div className="text-sm text-muted-foreground">
          <strong className="mr-3 text-black-600/70">
            {dictionary.application.description}{" "}
          </strong>
          <p className="mt-1 text-gray-700">{offer.description[locale]}</p>
        </div>
      </div>
    </div>
  );
};

export default JobOfferCard;
