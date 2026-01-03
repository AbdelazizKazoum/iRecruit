import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Users, Tag } from "lucide-react";
import React from "react";

import { getJobOfferById } from "@/libs/actions/offers";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ApplyButton from "@/components/concours/ApplyButton";

type OfferDetailsPageProps = {
  params: { lang: Locale; id: string };
};

const OfferDetailsPage = async ({ params }: OfferDetailsPageProps) => {
  const { lang, id } = params;
  const dictionary = await getDictionary(lang);
  const offer = await getJobOfferById(id);

  if (!offer) {
    return notFound();
  }

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <Link
          href={`/${lang}/concours`}
          className="inline-flex items-center text-sm text-primary font-medium hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {dictionary.concoursDetails?.backToList ||
            dictionary.concours.details}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
          <Card className="overflow-hidden">
            <div className="relative w-full h-64 sm:h-80 bg-gray-100">
              <Image
                src={offer.imageUrl}
                alt={offer.title[lang]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                priority
              />
            </div>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">
                  <Tag className="mr-2 h-3.5 w-3.5" />
                  {offer.tag[lang]}
                </Badge>
                <Badge variant="outline">
                  <CalendarDays className="mr-2 h-3.5 w-3.5" />
                  {dictionary.concours.publishedOn}: {offer.datePublication}
                </Badge>
                <Badge variant="outline" className="text-orange-600">
                  <CalendarDays className="mr-2 h-3.5 w-3.5" />
                  {dictionary.concours.deadline}: {offer.depotAvant}
                </Badge>
              </div>
              <CardTitle className="text-2xl lg:text-3xl">
                {offer.title[lang]}
              </CardTitle>
              <p className="text-muted-foreground leading-relaxed">
                {offer.description[lang]}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow
                  label={
                    dictionary.concoursDetails?.location ||
                    dictionary.application.city
                  }
                  value={offer.city?.[lang]}
                />
                <DetailRow
                  label={
                    dictionary.concoursDetails?.department ||
                    dictionary.application.department
                  }
                  value={offer.department?.[lang]}
                />
                <DetailRow
                  label={
                    dictionary.concoursDetails?.positions ||
                    dictionary.application.candidatesNumber
                  }
                  value={offer.candidatesNumber?.toString()}
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                {offer.organisme && (
                  <DetailRow
                    label={dictionary.concoursDetails?.organization}
                    value={offer.organisme?.[lang]}
                  />
                )}
                {offer.grade && (
                  <DetailRow
                    label={dictionary.concoursDetails?.grade}
                    value={offer.grade?.[lang]}
                  />
                )}
                {offer.specialite && (
                  <DetailRow
                    label={dictionary.concoursDetails?.speciality}
                    value={offer.specialite?.[lang]}
                  />
                )}
                {offer.etablissement && (
                  <DetailRow
                    label={dictionary.concoursDetails?.institution}
                    value={offer.etablissement?.[lang]}
                  />
                )}
              </div>
              <Separator />
              <div className="flex justify-end">
                <ApplyButton
                  offer={offer}
                  locale={lang}
                  label={
                    dictionary.concoursDetails?.applyNow ||
                    dictionary.concours.apply
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="self-start">
            <CardHeader>
              <CardTitle className="text-xl">
                {dictionary.concoursDetails?.summaryTitle ||
                  dictionary.concours.details}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <InfoLine
                icon={<MapPin className="h-4 w-4" />}
                label={dictionary.application.city}
                value={offer.city?.[lang]}
              />
              <InfoLine
                icon={<Users className="h-4 w-4" />}
                label={dictionary.application.candidatesNumber}
                value={offer.candidatesNumber?.toString()}
              />
              <InfoLine
                icon={<CalendarDays className="h-4 w-4" />}
                label={dictionary.concours.publishedOn}
                value={offer.datePublication}
              />
              <InfoLine
                icon={<CalendarDays className="h-4 w-4 text-orange-600" />}
                label={dictionary.concours.deadline}
                value={offer.depotAvant}
              />
              {offer.organisme && (
                <InfoLine
                  icon={<Tag className="h-4 w-4" />}
                  label={dictionary.concoursDetails?.organization}
                  value={offer.organisme?.[lang]}
                />
              )}

              <Separator />
              <ApplyButton
                offer={offer}
                locale={lang}
                label={
                  dictionary.concoursDetails?.applyNow ||
                  dictionary.concours.apply
                }
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
}) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

const InfoLine = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label?: string;
  value?: string;
}) => {
  if (!value) return null;

  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-foreground font-medium">{label}</span>
      <span className="ml-auto">{value}</span>
    </div>
  );
};

export default OfferDetailsPage;
