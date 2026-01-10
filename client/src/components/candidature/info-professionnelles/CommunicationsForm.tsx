/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { communicationsSchema } from "@/schemas/communicationsForm.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { communicationsType } from "@/types/candidature.types";
import React from "react";

const CommunicationsForm = ({ locale }: { locale: Locale }) => {
  // Hooks
  const { candidatureData, submitCommunication, setNextGroup } =
    useCandidatureStore();

  const onSubmit = async (data: communicationsType) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data

    formData.append("communication", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + rest.titre + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    return await submitCommunication(formData);
  };

  const handleNext = (value?: string) => {
    setNextGroup(value ?? "");
  };

  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="communications"
        schema={communicationsSchema}
        locale={locale}
        data={candidatureData?.professionalInformation?.communications || []}
        checkKey="titre"
        handleNext={handleNext}
      />
    </div>
  );
};

export default CommunicationsForm;
