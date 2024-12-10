import ProfileApplications from "@/components/profile/profile-page/ProfileApplications";
import ProfileInfo from "@/components/profile/profile-page/ProfileInfo";
import ProfileSettings from "@/components/profile/profile-page/ProfileSettings";
import { ProfileSidebar } from "@/components/profile/profile-page/ProfileSidebar";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getUserProfile } from "@/libs/actions/candidateActions";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";
import { CustomError } from "@/utils/errors/CustomError";
import { getDictionary } from "@/utils/getDictionary";
import Image from "next/image";
import React from "react";

const sidebarNavItems = [
  {
    title: {
      en: "Account",
      fr: "Compte",
      ar: "الحساب",
    },
    href: "/profile?section=compte",
  },
  {
    title: {
      en: "My Applications",
      fr: "Mes Candidatures",
      ar: "طلباتي",
    },
    href: "/profile?section=candidatures",
  },
  {
    title: {
      en: "Personal Information",
      fr: "Informations Personnelles",
      ar: "المعلومات الشخصية",
    },
    href: "/profile?section=info-personnelles",
  },
  {
    title: {
      en: "Qualifications and Experiences",
      fr: "Qualifications et Expériences",
      ar: "المؤهلات والخبرات",
    },
    href: "/profile?section=info-professionnelles",
  },
];

const ProfilePage = async ({
  searchParams,
  params,
}: {
  searchParams: { section: string };
  params: { lang: Locale };
}) => {
  const section = searchParams.section || "compte";

  const dictionary = await getDictionary(params.lang);

  const session = await auth();
  let user: UserType | null = null;

  const res = await getUserProfile(session?.user.email || "");
  if (!res.success) {
    throw new CustomError("401");
  }

  user = res.data || null;

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <header className="space-y-0.5">
          <h2 className="text-2xl font-bold text-black-600/90">
            {dictionary.profilePage.header.title}
          </h2>
          <p className="text-muted-foreground">
            {dictionary.profilePage.header.subtitle}
          </p>
        </header>
        <Separator className="my-6" />
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
            <ProfileSidebar items={sidebarNavItems} locale={params.lang} />
          </aside>
          <main className="flex-1 lg:max-w-2xl">
            {section === "compte" && (
              <ProfileInfo user={user} dictionary={dictionary} />
            )}
            {section === "candidatures" && (
              <ProfileApplications dictionary={dictionary} />
            )}
            {section === "info-personnelles" && (
              <ProfileInfo user={user} dictionary={dictionary} />
            )}
            {section === "info-professionnelles" && (
              <ProfileSettings dictionary={dictionary} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
