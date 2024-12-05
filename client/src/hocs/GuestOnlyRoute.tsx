// Next Imports
import { redirect } from "next/navigation";

// Third-party Imports
import { auth } from "@/libs/auth";

// Type Imports
import themeConfig from "@/configs/themeConfig";
import { ChildrenType } from "@/types/types";
import { Locale } from "@/configs/i18n";
import { getLocalizedUrl } from "@/utils/i18n";

const GuestOnlyRoute = async ({
  children,
  lang,
}: ChildrenType & { lang: Locale }) => {
  const session = await auth();

  if (session) {
    redirect(getLocalizedUrl(themeConfig.homePageUrl, lang));
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
