/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/configs/i18n";
import React from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";
import { useApplicationStore } from "@/stores/useApplication.store";
import { ApplicationType } from "@/types/application.types";

const AttachmentForm = ({ locale }: { locale: Locale }) => {
  // Hooks
  const { submitApplication } = useApplicationStore();

  const onSubmit = async (data: ApplicationType) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { attachment, ...rest } = data; // Destructure to separate files from other data
    console.log("🚀 ~ onSubmit ~ rest:", rest);

    formData.append("data", JSON.stringify(rest));

    // Add files under the 'files' key
    if (attachment) {
      Object.entries(attachment).map((item) => {
        const file = item[1] as File;
        const key = item[0] + "-" + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    submitApplication(formData);

    console.log(data);
  };

  return (
    <div>
      <DynamicNormalForm
        mode="new"
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
