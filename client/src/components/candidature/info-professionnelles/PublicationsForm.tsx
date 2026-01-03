/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { publicationsSchema } from "@/schemas/publications.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { PublicationsType } from "@/types/candidature.types";
import React from "react";

const PublicationsForm = ({ locale }: { locale: Locale }) => {
  // Hooks
  const { candidatureData, submitPublications, setNextGroup } =
    useCandidatureStore();

  const onSubmit = async (data: PublicationsType) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data

    formData.append("publications", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + rest.titre + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    submitPublications(formData);
  };

  const handleNext = (value?: string) => {
    setNextGroup(value ?? "Communications");
  };

  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="publications"
        schema={publicationsSchema}
        locale={locale}
        data={candidatureData?.professionalInformation?.publications || []}
        checkKey="titre"
        handleNext={handleNext}
      />
    </div>
  );
};

export default PublicationsForm;
