// src/pages/CandidateFormPage.tsx
"use client";
import DynamicForm from "@/components/form/DynamicForm";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { candidateFormSchema } from "@/schemas/candidateFormSchema";
import React from "react";

const CandidateFormPage = () => {
  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title="Concours et Offres d'Emploi"
          description="Explorez les concours et annonces d'emploi en cours et postulez pour saisir les meilleures opportunités correspondant à vos compétences et aspirations."
        />

        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <main className="flex-1 lg:max-w-2xl">
            <DynamicForm category="candidate" schema={candidateFormSchema} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CandidateFormPage;
