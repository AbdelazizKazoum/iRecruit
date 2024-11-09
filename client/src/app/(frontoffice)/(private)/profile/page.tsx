import ProfileApplications from "@/components/profile/profile-page/ProfileApplications";
import ProfileInfo from "@/components/profile/profile-page/ProfileInfo";
import ProfileSettings from "@/components/profile/profile-page/ProfileSettings";
import { ProfileSidebar } from "@/components/profile/profile-page/ProfileSidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const sidebarNavItems = [
  {
    title: "Compte",
    href: "/profile?section=compte",
  },
  {
    title: "Mes Candidatures",
    href: "/profile?section=candidatures",
  },
  {
    title: "Informations Personnelles",
    href: "/profile?section=info-personnelles",
  },
  {
    title: "Qualifications et Expériences",
    href: "/profile?section=info-professionnelles",
  },
];

const ProfilePage = ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const section = searchParams.section || "compte"; // Default to "info"

  return (
    <div className="max-w-screen-2xl mt-24 pb-24  px-4 sm:px-8 xl:px-16 mx-auto  ">
      <>
        <div className="space-y-6 py-10 lg:p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking- text-black-600/90">
              Espace Candidat
            </h2>
            <p className="text-muted-foreground">
              Gérez les paramètres de votre compte.{" "}
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              {/* Profile Image */}
              <div className="profile-image flex justify-center items-center mb-6">
                <Image
                  src="https://github.com/shadcn.png" // Placeholder image URL
                  alt="User Profile Image"
                  width={120} // Adjust size as needed
                  height={120}
                  className="rounded-full border border-gray-300" // Rounded with border
                />
              </div>
              <ProfileSidebar items={sidebarNavItems} />
            </aside>
            <main className="flex-1 lg:max-w-2xl">
              {section === "compte" && <ProfileInfo />}
              {section === "candidatures" && <ProfileSettings />}
              {section === "info-professionnelles" && <ProfileApplications />}
            </main>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfilePage;
