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
import QualificationsLists from "../profile/profile-page/QualificationsLists";
import { getDictionary } from "@/utils/getDictionary";

const VerifyInformation = ({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const { candidatureData } = useCandidatureStore();
  return (
    <div className="">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-primary my-3 ">
            {dictionary.application.personalInformation}
          </AccordionTrigger>
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
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-primary my-3 ">
            {dictionary.application.qualificationsExperiences}
          </AccordionTrigger>
          <AccordionContent>
            <QualificationsLists
              locale={locale}
              candidatureData={candidatureData}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default VerifyInformation;
