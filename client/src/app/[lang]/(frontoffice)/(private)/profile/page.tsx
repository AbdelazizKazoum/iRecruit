import Index from "@/components/profile/Index";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getUserProfile } from "@/libs/actions/candidateActions";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";
import { CustomError } from "@/utils/errors/CustomError";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

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
        <Index
          locale={params.lang}
          section={section}
          user={user}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
