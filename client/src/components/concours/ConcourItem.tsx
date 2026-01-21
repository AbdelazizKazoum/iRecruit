"use client";
import { BellRing, FileText } from "lucide-react"; // Importing FileText as a PDF icon
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getDictionary } from "@/utils/getDictionary";
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche payload for public cards.
import { Locale } from "@/configs/i18n";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

export function ConcourItem({
  className,
  dictionary,
  tranche,
  locale,
}: {
  className: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  tranche: ActiveTranche; // Tranche includes job offer + session metadata.
  locale: Locale;
}) {
  const offer = tranche.jobOffer; // Extract job offer details for display.
  const sessionLabel = tranche.session?.yearLabel; // Recruitment session year label.
  const trancheLabel = tranche.name; // Tranche name to show on the card.
  const sessionPrefix = dictionary.concours?.sessionLabel || "Session"; // Localized session label.
  const tranchePrefix = dictionary.concours?.trancheLabel || "Tranche"; // Localized tranche label.
  const deadlineDate = new Date(tranche.endDate); // Use tranche end date as the deadline.
  const deadlineLabel = Number.isNaN(deadlineDate.getTime())
    ? tranche.endDate
    : deadlineDate.toLocaleDateString(locale); // Fallback to raw value if parsing fails.
  const detailsHref = tranche._id ? `/${locale}/concours/${tranche._id}` : ""; // Route by tranche id.

  return (
    <Card
      className={cn(
        "flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out group h-full",
        "border border-border hover:border-primary hover:shadow-lg",
        className
      )}
    >
      <div className="relative w-full h-32 sm:h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
        <Image
          src={offer.imageUrl}
          alt={offer.title[locale]}
          fill
          className="object-cover rounded-t-md transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="grid gap-2 p-3 sm:p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-bold line-clamp-2 leading-tight">
            {offer.title[locale]}
          </CardTitle>
          <BellRing className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0 mt-1" />
        </div>

        <CardDescription className="text-xs sm:text-sm line-clamp-3 sm:line-clamp-4 mt-1">
          {offer.description[locale]}
        </CardDescription>

          <div className="mt-auto pt-2 space-y-3">
            {/* Session and tranche badges for active context */}
            {(sessionLabel || trancheLabel) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {sessionLabel && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {sessionPrefix} {sessionLabel}
                  </span>
                )}
                {trancheLabel && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    {tranchePrefix}: {trancheLabel}
                  </span>
                )}
              </div>
            )}
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              {offer.tag[locale]}
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground border-t pt-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">
                {dictionary["concours"].publishedOn}
              </span>
              <span>{offer.datePublication}</span>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span className="font-medium text-foreground">
                {dictionary["concours"].deadline}
              </span>
              <span className="text-orange-600 dark:text-orange-400 font-medium">
                {deadlineLabel}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 p-3 sm:p-4 pt-0 mt-auto">
        {detailsHref ? (
          <Link className="w-full sm:flex-1" href={detailsHref}>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-9 text-xs sm:text-sm"
            >
              <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {dictionary["concours"].details}
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 h-9 text-xs sm:text-sm"
            disabled
          >
            <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {dictionary["concours"].details}
          </Button>
        )}
        <ApplyButton
          tranche={tranche}
          locale={locale}
          label={dictionary["concours"].apply}
          className="w-full sm:flex-1 h-9 text-xs sm:text-sm"
        />
      </CardFooter>
    </Card>
  );
}
