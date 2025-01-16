"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProfileSidebar } from "./profile-page/ProfileSidebar";
import { PersonalInformation } from "./profile-page/PersonalInformation";
import ProfileApplications from "./profile-page/ProfileApplications";
import ProfileInfo from "@/components/profile/profile-page/ProfileInfo";
import { Locale } from "@/configs/i18n";
import { UserType } from "@/types/user.types";
import { getDictionary } from "@/utils/getDictionary";
import { useCandidatureStore } from "@/stores/candidature.store";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Separator } from "../ui/separator";
import QualificationsLists from "./profile-page/QualificationsLists";
import { useApplicationStore } from "@/stores/useApplication.store";

const Index = ({
  locale,
  section,
  user,
  dictionary,
}: {
  locale: Locale;
  section: string;
  user: UserType | null;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const [loading, setLoading] = useState(true);

  // Hooks
  const { candidatureData, fetchCandidatureData } = useCandidatureStore();
  const { fetchApplications, applications } = useApplicationStore();

  useEffect(() => {
    (async () => {
      await fetchCandidatureData();
      await fetchApplications();
    })();

    setLoading(false);
  }, [fetchCandidatureData, fetchApplications]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <div className="profile-image flex justify-center items-center mb-6">
            <Image
              src="https://github.com/shadcn.png" // Placeholder image URL
              alt="User Profile Image"
              width={120}
              height={120}
              className="rounded-full border border-gray-300"
            />
          </div>
          <ProfileSidebar locale={locale} />
        </aside>
        <main className="flex-1">
          {loading ? (
            // Show skeleton loader while loading
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <Separator />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            // Show content when loading is complete
            <>
              {section === "compte" && (
                <ProfileInfo user={user} dictionary={dictionary} />
              )}
              {section === "candidatures" && (
                <ProfileApplications
                  dictionary={dictionary}
                  applications={applications}
                  locale={locale}
                />
              )}
              {section === "info-personnelles" && (
                <PersonalInformation
                  candidatureData={candidatureData}
                  locale={locale}
                  dictionary={dictionary}
                />
              )}
              {section === "info-professionnelles" && (
                <QualificationsLists
                  locale={locale}
                  candidatureData={candidatureData}
                  dictionary={dictionary}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
