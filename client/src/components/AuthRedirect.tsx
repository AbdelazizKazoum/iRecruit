"use client";

import themeConfig from "@/configs/themeConfig";
// Next Imports
import { redirect, usePathname } from "next/navigation";

// Type Imports
// import type { Locale } from '@configs/i18n'

// Config Imports
// import themeConfig from '@configs/themeConfig'

// Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

const AuthRedirect = () => {
  const pathname = usePathname();

  const redirectUrl = `/login?redirectTo=${pathname}`;
  const login = `/login`;
  const homePage = themeConfig.homePageUrl;

  return redirect(
    pathname === login ? login : pathname === homePage ? login : redirectUrl
  );
};

export default AuthRedirect;
