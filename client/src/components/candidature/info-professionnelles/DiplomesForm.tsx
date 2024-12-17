/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import useApiClient from "@/hooks/ApiClient";
import { diplomesSchema } from "@/schemas/diplomes.schema";
import React from "react";

const DiplomesForm = ({ locale }: { locale: Locale }) => {
  const apiClient = useApiClient();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data
    console.log("🚀 ~ onSubmit ~ rest:", rest);

    formData.append("diplomes", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        const key = item[0] + rest.diplomeType + `.${file.name.split(".")[1]}`;

        formData.append("files", file, key);
      });
    }

    try {
      const res = await apiClient.post(`/candidature/diplomes`, formData);

      console.log(res);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log(data);
  };
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="diplomes"
        schema={diplomesSchema}
        locale={locale}
        data={[]}
      />
    </div>
  );
};

export default DiplomesForm;
