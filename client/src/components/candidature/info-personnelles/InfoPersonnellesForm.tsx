"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Locale } from "@/configs/i18n";
import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { getDictionary } from "@/utils/getDictionary";
import { useRouter } from "next/navigation";

const InfoPersonnelles = ({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  // Hooks
  const { candidatureData, submitPersonalInformation } = useCandidatureStore();
  const router = useRouter();

  async function onSubmit(data: any) {
    // Create a new FormData instance
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data
    formData.append("personalInformations", JSON.stringify(rest));

    // Add files under the 'files' key
    if (files) {
      Object.entries(files).map((item) => {
        const file = item[1] as File;
        if (item[1]) {
          const key =
            item[0] + `.${file.name ? file.name.split(".")[1] : "pdf"}` || "";

          formData.append("files", file, key);
        }
      });
    }

    await submitPersonalInformation(formData);
    router.push(`/${locale}/candidature?section=info-professionnelles`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">
          {dictionary.candidature.sections.personalInfo.title}{" "}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.candidature.sections.personalInfo.description}
        </p>
      </div>
      <div>
        <DynamicNormalForm
          showButton={true}
          mode="new"
          onSubmit={onSubmit}
          category="personal-informations"
          schema={personalInformationSchema}
          locale={locale}
          defaultValues={candidatureData?.personalInformation}
        />
      </div>
    </div>
  );
};

export default InfoPersonnelles;
