import { ConcourItem } from "@/components/concours/ConcourItem";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "@/libs/actions/candidateActions";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";
import { CustomError } from "@/utils/errors/CustomError";
import React from "react";

export const jobList = [
  {
    title: "Agent Administratif",
    description:
      "Traitez et suivez les dossiers administratifs au sein de notre organisation.",
    tag: "Administration",
    datePublication: "01/11/2024",
    depotAvant: "15/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/3182788/pexels-photo-3182788.jpeg",
  },
  {
    title: "Responsable Informatique",
    description:
      "Gérez l’infrastructure informatique, la sécurité des données, et le support technique.",
    tag: "Informatique",
    datePublication: "01/11/2024",
    depotAvant: "20/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
  },
  {
    title: "Chargé de Communication",
    description:
      "Développez des stratégies de communication et de promotion pour notre organisation.",
    tag: "Communication",
    datePublication: "05/11/2024",
    depotAvant: "20/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg",
  },
  {
    title: "Comptable",
    description:
      "Assurez la gestion des finances, des rapports financiers, et des analyses budgétaires.",
    tag: "Comptabilité",
    datePublication: "02/11/2024",
    depotAvant: "18/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/6863422/pexels-photo-6863422.jpeg",
  },
  {
    title: "Assistant(e) RH",
    description:
      "Gérez les dossiers du personnel et soutenez le recrutement et la formation.",
    tag: "Ressources Humaines",
    datePublication: "03/11/2024",
    depotAvant: "17/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/346807/pexels-photo-346807.jpeg",
  },
  {
    title: "Juriste",
    description:
      "Assurez la conformité légale et conseillez l'organisation sur les aspects juridiques.",
    tag: "Juridique",
    datePublication: "06/11/2024",
    depotAvant: "25/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/1181399/pexels-photo-1181399.jpeg",
  },
];

const Concours = async () => {
  const session = await auth();
  let user: UserType | null = null;

  const res = await getUserProfile(session?.user.email || "");
  if (!res.success) {
    throw new CustomError("401");
  }

  user = res.data;
  console.log("🚀 ~ Concours ~ user:", user);

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title="Annonces de Concours"
          description="Consultez les dernières annonces de concours et postulez aux offres qui correspondent à votre profil."
        />
        <Separator className="my-6" />
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none">
            <div className="relative">
              <div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 pb-4 ">
                  {jobList.map((item) => (
                    <ConcourItem
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      className=""
                      imageUrl={item.imageUrl}
                      depotAvant={item.depotAvant}
                      datePublication={item.datePublication}
                      tag=""
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concours;
