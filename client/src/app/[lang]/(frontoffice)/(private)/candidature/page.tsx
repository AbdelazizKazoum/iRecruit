import { CandidatureApplication } from "@/components/candidature/CandidatureApplication";
import { CandidatureSidebar } from "@/components/candidature/CandidatureSidebar";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const CandidateFormPage = async ({
  searchParams,
  params,
}: {
  searchParams: { section: string };
  params: { lang: Locale };
}) => {
  const section = searchParams.section || "info-personnelles";
  // const { data } = useSession();

  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["candidature"].title}
          description={dictionary["candidature"].description}
        />

        <Separator className="my-6" />
        <div className="flex flex-col gap-6 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="">
            <CandidatureSidebar
              local={params.lang}
              classname=""
              dictionary={dictionary}
            />
          </aside>
          <CandidatureApplication section={section} local={params.lang} />
        </div>
      </div>
    </div>
  );
};

export default CandidateFormPage;
