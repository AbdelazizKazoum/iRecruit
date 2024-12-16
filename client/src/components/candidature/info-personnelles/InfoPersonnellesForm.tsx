"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Locale } from "@/configs/i18n";
import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";
import userApi from "@/libs/api";

const InfoPersonnelles = ({ locale }: { locale: Locale }) => {
  async function onSubmit(data: any) {
    console.log(data);

    // Create a new FormData instance
    const formData = new FormData();

    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data
    formData.append("personalInformations", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key = item[0] + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    try {
      const res = await userApi.post(
        `/candidature/personal-informations`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">Application </h3>
        <p className="text-sm text-muted-foreground">
          Cest ainsi que les autres vous verront sur le site.{" "}
        </p>
      </div>
      <div>
        <DynamicNormalForm
          onSubmit={onSubmit}
          category="personal-informations"
          schema={personalInformationSchema}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default InfoPersonnelles;
