"use client";
import React from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";
import { candidateFormSchema } from "@/schemas/candidateFormSchema";
import { Locale } from "@/configs/i18n";
import InfoProfessionnelles from "./info-professionnelles/Index";
import { Separator } from "../ui/separator";

export const CandidatureApplication = ({
  section,
  local,
}: {
  section: string;
  local: Locale;
}) => {
  return (
    <main className="flex-1 ">
      {section === "info-personnelles" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-black-600/85">
              Application{" "}
            </h3>
            <p className="text-sm text-muted-foreground">
              Cest ainsi que les autres vous verront sur le site.{" "}
            </p>
          </div>
          <Separator />
          <DynamicNormalForm
            category="candidate"
            schema={candidateFormSchema}
            local={local}
          />
        </div>
      )}
      {section === "info-professionnelles" && (
        <InfoProfessionnelles locale={local} />
      )}
    </main>
  );
};
