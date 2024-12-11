import { Separator } from "@/components/ui/separator";
import React from "react";
import DiplomesForm from "./DiplomesForm";
import { Locale } from "@/configs/i18n";

const InfoProfessionnelles = ({ locale }: { locale: Locale }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">Application </h3>
        <p className="text-sm text-muted-foreground">
          Cest ainsi que les autres vous verront sur le site.{" "}
        </p>
      </div>
      <Separator />
      <DiplomesForm locale={locale} />
    </div>
  );
};

export default InfoProfessionnelles;
