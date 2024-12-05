import { ConcourItem } from "@/components/concours/ConcourItem";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const jobList = [
  {
    title: {
      en: "Administrative Agent",
      fr: "Agent Administratif",
      ar: "موظف إداري",
    },
    description: {
      en: "Process and follow administrative files within our organization.",
      fr: "Traitez et suivez les dossiers administratifs au sein de notre organisation.",
      ar: "عالج وتابع الملفات الإدارية داخل مؤسستنا.",
    },
    tag: {
      en: "Administration",
      fr: "Administration",
      ar: "الإدارة",
    },
    datePublication: "01/11/2024",
    depotAvant: "15/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/3182788/pexels-photo-3182788.jpeg",
  },
  {
    title: {
      en: "IT Manager",
      fr: "Responsable Informatique",
      ar: "مسؤول تقنية المعلومات",
    },
    description: {
      en: "Manage IT infrastructure, data security, and technical support.",
      fr: "Gérez l’infrastructure informatique, la sécurité des données, et le support technique.",
      ar: "قم بإدارة البنية التحتية لتقنية المعلومات وأمان البيانات والدعم الفني.",
    },
    tag: {
      en: "IT",
      fr: "Informatique",
      ar: "تقنية المعلومات",
    },
    datePublication: "01/11/2024",
    depotAvant: "20/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
  },
  {
    title: {
      en: "Communication Officer",
      fr: "Chargé de Communication",
      ar: "مسؤول الاتصال",
    },
    description: {
      en: "Develop communication and promotion strategies for our organization.",
      fr: "Développez des stratégies de communication et de promotion pour notre organisation.",
      ar: "طور استراتيجيات الاتصال والترويج لمؤسستنا.",
    },
    tag: {
      en: "Communication",
      fr: "Communication",
      ar: "الاتصال",
    },
    datePublication: "05/11/2024",
    depotAvant: "20/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg",
  },
  {
    title: {
      en: "Accountant",
      fr: "Comptable",
      ar: "محاسب",
    },
    description: {
      en: "Manage finances, financial reports, and budget analysis.",
      fr: "Assurez la gestion des finances, des rapports financiers, et des analyses budgétaires.",
      ar: "تولى إدارة المالية والتقارير المالية وتحليل الميزانية.",
    },
    tag: {
      en: "Accounting",
      fr: "Comptabilité",
      ar: "المحاسبة",
    },
    datePublication: "02/11/2024",
    depotAvant: "18/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/6863422/pexels-photo-6863422.jpeg",
  },
  {
    title: {
      en: "HR Assistant",
      fr: "Assistant(e) RH",
      ar: "مساعد الموارد البشرية",
    },
    description: {
      en: "Manage personnel files and support recruitment and training.",
      fr: "Gérez les dossiers du personnel et soutenez le recrutement et la formation.",
      ar: "قم بإدارة ملفات الموظفين ودعم التوظيف والتدريب.",
    },
    tag: {
      en: "Human Resources",
      fr: "Ressources Humaines",
      ar: "الموارد البشرية",
    },
    datePublication: "03/11/2024",
    depotAvant: "17/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/346807/pexels-photo-346807.jpeg",
  },
  {
    title: {
      en: "Legal Advisor",
      fr: "Juriste",
      ar: "مستشار قانوني",
    },
    description: {
      en: "Ensure legal compliance and advise the organization on legal matters.",
      fr: "Assurez la conformité légale et conseillez l'organisation sur les aspects juridiques.",
      ar: "تأكد من الامتثال القانوني وقدم المشورة للمؤسسة بشأن الأمور القانونية.",
    },
    tag: {
      en: "Legal",
      fr: "Juridique",
      ar: "القانون",
    },
    datePublication: "06/11/2024",
    depotAvant: "25/11/2024",
    imageUrl:
      "https://images.pexels.com/photos/1181399/pexels-photo-1181399.jpeg",
  },
];

const Concours = async ({ params }: { params: { lang: Locale } }) => {
  // user = res.data;

  const dictionary = await getDictionary(params.lang);

  const { lang: locale } = params;

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["concours"].title}
          description={dictionary["concours"].description}
        />
        <Separator className="my-6" />
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none">
            <div className="relative">
              <div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 pb-4 ">
                  {jobList.map((item) => (
                    <ConcourItem
                      dictionary={dictionary}
                      key={item.title[locale]}
                      title={item.title[locale]}
                      description={item.description[locale]}
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
