/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { languesSchema } from "@/schemas/langues.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { NiveauxLanguesType } from "@/types/candidature.types";
import React from "react";

const LanquesForm = ({ locale }: { locale: Locale }) => {
  const { candidatureData, submitNiveauxLangues } = useCandidatureStore();

  const onSubmit = async (data: NiveauxLanguesType) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data
    console.log("🚀 ~ onSubmit ~ rest:", rest);

    formData.append("niveauxLangues", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + rest + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    submitNiveauxLangues(formData);

    console.log(data);
  };

  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="langues"
        schema={languesSchema}
        locale={locale}
        data={candidatureData?.professionalInformation?.niveauxLangues || []}
        checkKey="langue"
      />
    </div>
  );
};

export default LanquesForm;
