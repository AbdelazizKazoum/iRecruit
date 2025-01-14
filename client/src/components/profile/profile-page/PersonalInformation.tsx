"use client";
import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";
import { CandidatureType } from "@/types/candidature.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

export const PersonalInformation = ({
  locale,
  candidatureData,
  dictionary,
}: {
  locale: Locale;
  candidatureData: CandidatureType | null;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  return (
    <div className="space-y-6">
      <PageHeader
        size="sm"
        title={dictionary.profilePage.sections["info-personnelles"].title}
        description={
          dictionary.profilePage.sections["info-personnelles"].description
        }
      />
      <Separator />
      <DynamicNormalForm
        onSubmit={() => {}}
        category="personal-informations"
        schema={personalInformationSchema}
        locale={locale}
        defaultValues={candidatureData?.personalInformation}
        mode="readonly"
      />{" "}
    </div>
  );
};
