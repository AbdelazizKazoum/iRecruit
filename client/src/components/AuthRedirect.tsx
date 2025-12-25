"use client";

import { Locale } from "@/configs/i18n";
import themeConfig from "@/configs/themeConfig";
import { getLocalizedUrl } from "@/utils/i18n";
// Next Imports
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";

// Type Imports
// import type { Locale } from '@configs/i18n'

// Config Imports
// import themeConfig from '@configs/themeConfig'

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = `/${lang}/login?redirectTo=${pathname}`;
    const login = `/${lang}/login`;
    const homePage = getLocalizedUrl(themeConfig.homePageUrl, lang);

    const target =
      pathname === login ? login : pathname === homePage ? login : redirectUrl;

    router.push(target);
  }, [lang, pathname, router]);

  return <Loading />;
};

export default AuthRedirect;
