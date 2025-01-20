/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { diplomesSchema } from "@/schemas/diplomes.schema";
import { useCandidatureStore } from "@/stores/candidature.store";
import { ParcoursEtDiplomesTypes } from "@/types/candidature.types";
import React from "react";

const DiplomesForm = ({ locale }: { locale: Locale }) => {
  // Hooks
  const { candidatureData, submitDiplome, nextGroup, setNextGroup } =
    useCandidatureStore();

  const onSubmit = async (data: ParcoursEtDiplomesTypes) => {
    const formData = new FormData();
    // Add the rest of the data as a JSON string under the key 'data'
    const { files, ...rest } = data; // Destructure to separate files from other data

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
  };

  const handleNext = (value?: string) => {
    setNextGroup(value ?? "Niveaux Langues");
  };

  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="diplomes"
        schema={diplomesSchema}
        locale={locale}
        data={
          candidatureData?.professionalInformation?.parcoursEtDiplomes || []
        }
        checkKey="diplomeType"
        openedAccordion={nextGroup}
        handleNext={handleNext}
      />
    </div>
  );
};

export default DiplomesForm;
