"use client";

import { Locale } from "@/configs/i18n";
import themeConfig from "@/configs/themeConfig";
import { getLocalizedUrl } from "@/utils/i18n";
// Next Imports
import { redirect, usePathname } from "next/navigation";

// Type Imports
// import type { Locale } from '@configs/i18n'

// Config Imports
// import themeConfig from '@configs/themeConfig'

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname();

  const redirectUrl = `/${lang}/login?redirectTo=${pathname}`;
  const login = `/${lang}/login`;
  const homePage = getLocalizedUrl(themeConfig.homePageUrl, lang);

  return redirect(
    pathname === login ? login : pathname === homePage ? login : redirectUrl
  );
};

export default AuthRedirect;
