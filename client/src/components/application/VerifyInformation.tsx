import React from "react";
import DynamicNormalForm from "../dynamic-form/DynamicNormalForm";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";
import { Locale } from "@/configs/i18n";
import { useCandidatureStore } from "@/stores/candidature.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const VerifyInformation = ({ locale }: { locale: Locale }) => {
  const { candidatureData } = useCandidatureStore();
  return (
    <div className="">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            <DynamicNormalForm
              onSubmit={() => {}}
              category="personal-informations"
              schema={personalInformationSchema}
              locale={locale}
              defaultValues={candidatureData?.personalInformation}
              mode="readonly"
            />{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default VerifyInformation;
