import List from "@/components/dynamic-form/List";
import {
  communicationsFormConfig,
  diplomesFormConfig,
  languesFormConfig,
  publicationsFormConfig,
} from "@/configs/formConfigs";
import { Locale } from "@/configs/i18n";
import { CandidatureType } from "@/types/candidature.types";
import React from "react";

const QualificationsLists = ({
  locale,
  candidatureData,
}: {
  locale: Locale;
  candidatureData: CandidatureType | null;
}) => {
  return (
    <div>
      {" "}
      <List
        submittedData={
          candidatureData?.professionalInformation.parcoursEtDiplomes
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
