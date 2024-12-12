import { Separator } from "@/components/ui/separator";
import React from "react";
import DiplomesForm from "./DiplomesForm";
import { Locale } from "@/configs/i18n";
import LanquesForm from "./LanquesForm";
import PublicationsForm from "./PublicationsForm";
import CommunicationsForm from "./CommunicationsForm";

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
      <LanquesForm locale={locale} />
      <PublicationsForm locale={locale} />
      <CommunicationsForm locale={locale} />
    </div>
  );
};

export default InfoProfessionnelles;
