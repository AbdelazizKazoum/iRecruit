import Index from "@/components/application/Index";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const JobOfferPosting = async ({
  searchParams,
  params,
}: {
  searchParams: { section: string };
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["candidature"].title}
          description={dictionary["candidature"].description}
        />
        <Separator className="my-6" />

        <Index />

        {
          <>
            <div className="container mx-auto p-6 ">
              {/* Attachments Card */}

              {/* Personal Information Card */}

              {/* Professional Information Card */}
              <div className="bg-white shadow-md rounded-lg">
                <div className="bg-gray-200 p-4 rounded-t-lg">
                  <h2 className="text-lg font-semibold">
                    Informations Professionnelles
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  <p>
                    <strong>Poste Actuel:</strong> Développeur Web
                  </p>
                  <p>
                    <strong>Expérience:</strong> 3 ans
                  </p>
                  <p>
                    <strong>Dernier Employeur:</strong> XYZ Tech
                  </p>
                  <p>
                    <strong>Niveau d'Études:</strong> Bac+5
                  </p>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default JobOfferPosting;
