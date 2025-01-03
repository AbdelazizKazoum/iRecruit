"use client";
import { BellRing, FileText } from "lucide-react"; // Importing FileText as a PDF icon
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getDictionary } from "@/utils/getDictionary";
import { OfferType } from "@/types/application.types";
import { Locale } from "@/configs/i18n";
import { useApplicationStore } from "@/stores/useApplication.store";
import { useRouter } from "next/navigation";

export function ConcourItem({
  className,
  dictionary,
  offer,
  locale,
}: {
  className: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  offer: OfferType;
  locale: Locale;
}) {
  // Hooks
  const { setOffer } = useApplicationStore();
  const router = useRouter();

  const apply = (data: OfferType) => {
    setOffer(data);

    router.push(`/${locale}/postuler`);
  };

  return (
    <Card
      className={cn(
        "flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out",
        "border border-border hover:border-primary hover:shadow-lg",
        className
      )}
    >
      <CardHeader>
        <Image
          src={offer.imageUrl}
          alt="Job Image"
          className="w-full h-32 object-cover rounded-t-md"
          width={350}
          height={350}
        />
      </CardHeader>
      <CardContent className="grid gap-2 p-4">
        <BellRing className="text-gray-400" />
        <CardTitle>{offer.title[locale]}</CardTitle>
        <CardDescription>{offer.description[locale]}</CardDescription>
        <div className="mt-2 text-blue-600 text-sm font-semibold">
          {offer.tag[locale]}
        </div>
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <div className="flex flex-col text-black-600/80">
            <span className="font-semibold">
              {" "}
              {dictionary["concours"].publishedOn}{" "}
            </span>
            <span className=" text-muted-foreground ">
              {" "}
              {offer.datePublication}
            </span>
          </div>
          <div className="flex flex-col text-black-600/80">
            <span className="font-semibold">
              {dictionary["concours"].deadline}{" "}
            </span>
            <span className=" text-orange-500 ">{offer.depotAvant}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4">
        <Button variant="outline" className="flex-1 items-center">
          <FileText className="mr-2" /> {dictionary["concours"].details}
        </Button>
        <Button className="flex-1 items-center" onClick={() => apply(offer)}>
          {" "}
          {dictionary["concours"].apply}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
