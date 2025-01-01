/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/configs/i18n";
import React, { forwardRef } from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";
import { useApplicationStore } from "@/stores/useApplication.store";
import { ApplicationType } from "@/types/application.types";
import { applicationFormSchema } from "@/schemas/applicationForm.schema";

const AttachmentForm = forwardRef<HTMLFormElement, { locale: Locale }>(
  ({ locale }, ref) => {
    // Hooks
    const { setApplication, selectedOffer } = useApplicationStore();

    const onSubmit = async (data: ApplicationType) => {
      const dataToSubmit = { ...data, offer: selectedOffer };

      setApplication(dataToSubmit);

      // if (selectedOffer) {
      //const formData = new FormData();

      //   // Add the rest of the data as a JSON string under the key 'data'
      //   const { attachment, ...rest } = data; // Destructure to separate files from other data

      //   const dataToSubmit = { ...rest, offer: selectedOffer };
      //   console.log("🚀 ~ onSubmit ~ rest:", dataToSubmit);

      //   formData.append("data", JSON.stringify(dataToSubmit));

      //   // Add files under the 'files' key
      //   if (attachment) {
      //     Object.entries(attachment).map((item) => {
      //       const file = item[1] as File;
      //       const key = item[0] + "-" + `.${file.name.split(".")[1]}`;

      //       formData.append("files", file, key);
      //     });
      //   }

      //   submitApplication(formData);
      // }
      console.log("🚀 ~ onSubmit ~ dataToSubmit:", dataToSubmit);
    };

    return (
      <div>
        <DynamicNormalForm
          ref={ref}
          mode="new"
          onSubmit={onSubmit}
          category="attachment"
          schema={applicationFormSchema}
          locale={locale}
          defaultValues={""}
        />
      </div>
    );
  }
);

AttachmentForm.displayName = "AttachmentForm";
export default AttachmentForm;
