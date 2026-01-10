import List from "@/components/dynamic-form/List";
import PageHeader from "@/components/PageHeader";
import {
  communicationsFormConfig,
  diplomesFormConfig,
  experiencesFormConfig,
  languesFormConfig,
  publicationsFormConfig,
} from "@/configs/formConfigs";
import { Locale } from "@/configs/i18n";
import { CandidatureType } from "@/types/candidature.types";
import { getDictionary } from "@/utils/getDictionary";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

const QualificationsLists = ({
  locale,
  candidatureData,
  dictionary,
}: {
  locale: Locale;
  candidatureData: CandidatureType | null;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  return (
    <div>
      <PageHeader
        size="sm"
        title={dictionary.profilePage.sections["info-professionnelles"].title}
        description={
          dictionary.profilePage.sections["info-professionnelles"].description
        }
      />
      <Separator />
      <List
        submittedData={candidatureData?.professionalInformation?.experiences}
        locale={locale}
        fields={experiencesFormConfig.fields}
        title={experiencesFormConfig.title[locale]}
      />
      <List
        submittedData={
          candidatureData?.professionalInformation?.parcoursEtDiplomes
        }
        locale={locale}
        fields={diplomesFormConfig?.fields}
        title={diplomesFormConfig?.title[locale]}
      />
      <List
        submittedData={candidatureData?.professionalInformation?.niveauxLangues}
        locale={locale}
        fields={languesFormConfig?.fields}
        title={languesFormConfig?.title[locale]}
      />
      <List
        submittedData={candidatureData?.professionalInformation?.publications}
        locale={locale}
        fields={publicationsFormConfig.fields}
        title={publicationsFormConfig.title[locale]}
      />
      <List
        submittedData={candidatureData?.professionalInformation?.communications}
        locale={locale}
        fields={communicationsFormConfig.fields}
        title={communicationsFormConfig.title[locale]}
      />
    </div>
  );
};

export default QualificationsLists;
