/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/configs/i18n";
import { useCandidatureStore } from "@/stores/candidature.store";
import { ParcoursEtDiplomesTypes } from "@/types/candidature.types";
import React from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";

const AttachmentForm = ({ locale }: { locale: Locale }) => {
  // Hooks
  const { submitDiplome } = useCandidatureStore();

  const onSubmit = async (data: ParcoursEtDiplomesTypes) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data
    console.log("🚀 ~ onSubmit ~ rest:", rest);

    formData.append("diplomes", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key =
          item[0] + "-" + rest.diplomeType + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    submitDiplome(formData);

    console.log(data);
  };

  return (
    <div>
      <DynamicNormalForm
        onSubmit={onSubmit}
        category="attachment"
        schema={""}
        locale={locale}
        defaultValues={""}
      />
    </div>
  );
};

export default AttachmentForm;
