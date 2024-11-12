import ProfileApplications from "@/components/profile/profile-page/ProfileApplications";
import ProfileInfo from "@/components/profile/profile-page/ProfileInfo";
import ProfileSettings from "@/components/profile/profile-page/ProfileSettings";
import { ProfileSidebar } from "@/components/profile/profile-page/ProfileSidebar";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "@/libs/actions/candidateActions";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";
import { CustomError } from "@/utils/errors/CustomError";
import Image from "next/image";
import React from "react";

const sidebarNavItems = [
  { title: "Compte", href: "/profile?section=compte" },
  { title: "Mes Candidatures", href: "/profile?section=candidatures" },
  {
    title: "Informations Personnelles",
    href: "/profile?section=info-personnelles",
  },
  {
    title: "Qualifications et Expériences",
    href: "/profile?section=info-professionnelles",
  },
];

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const section = searchParams.section || "compte";

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
            Espace Candidat
          </h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre compte.
          </p>
        </header>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
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
            <ProfileSidebar items={sidebarNavItems} />
          </aside>
          <main className="flex-1 lg:max-w-2xl">
            {section === "compte" && <ProfileInfo user={user} />}
            {section === "candidatures" && <ProfileApplications />}
            {section === "info-personnelles" && <ProfileInfo user={user} />}
            {section === "info-professionnelles" && <ProfileSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
