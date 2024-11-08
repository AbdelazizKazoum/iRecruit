import ProfileApplications from "@/components/profile/profile-page/ProfileApplications";
import ProfileInfo from "@/components/profile/profile-page/ProfileInfo";
import ProfileSettings from "@/components/profile/profile-page/ProfileSettings";
import { ProfileSidebar } from "@/components/profile/profile-page/ProfileSidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile?section=info",
  },
  {
    title: "Settings",
    href: "/profile?section=settings",
  },
  {
    title: "Applications",
    href: "/profile?section=applications",
  },
];

const ProfilePage = ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const section = searchParams.section || "info"; // Default to "info"

  return (
    <div className="max-w-screen-2xl mt-24 px-8 xl:px-16 mx-auto bourder-lg ">
      <>
        <div className="md:hidden">
          <Image
            src="/examples/forms-light.png"
            width={1280}
            height={791}
            alt="Forms"
            className="block dark:hidden"
          />
          <Image
            src="/examples/forms-dark.png"
            width={1280}
            height={791}
            alt="Forms"
            className="hidden dark:block"
          />
          ProfileInfo
        </div>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
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
              {section === "info" && <ProfileInfo />}
              {section === "settings" && <ProfileSettings />}
              {section === "applications" && <ProfileApplications />}
            </main>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfilePage;
