// src/pages/CandidateFormPage.tsx
"use client";
import { CandidatureSidebar } from "@/components/candidature/CandidatureSidebar";
import DynamicNormalForm from "@/components/form/DynamicNormalForm";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { candidateFormSchema } from "@/schemas/candidateFormSchema";
import { BriefcaseBusiness, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const steps = [
  {
    title: "Informations Personnelles",
    href: "/candidature?section=info-personnelles",
    icon: <Users />,
  },
  {
    title: "Qualifications/Expériences",
    href: "/candidature?section=info-professionnelles",
    icon: <BriefcaseBusiness />,
  },
];

const CandidateFormPage = ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const section = searchParams.section || "info-personnelles";
  const { data } = useSession();
  console.log("🚀 ~ session:", data);

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title="Concours et Offres d'Emploi"
          description="Explorez les concours et annonces d'emploi en cours et postulez pour saisir les meilleures opportunités correspondant à vos compétences et aspirations."
        />

        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="">
            <div className="profile-image flex justify-center items-center mb-6"></div>
            <CandidatureSidebar items={steps} />
          </aside>
          <main className="flex-1 ">
            {section === "info-personnelles" && (
              <DynamicNormalForm
                category="candidate"
                schema={candidateFormSchema}
              />
            )}
            {section === "info-professionnelles" && (
              <DynamicNormalForm
                category="candidate"
                schema={candidateFormSchema}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CandidateFormPage;
