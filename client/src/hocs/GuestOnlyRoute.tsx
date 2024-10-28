// Next Imports
import { redirect } from "next/navigation";

// Third-party Imports
import { auth } from "@/libs/auth";

// Type Imports
import themeConfig from "@/configs/themeConfig";
import { ReactNode } from "react";

const GuestOnlyRoute = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect(themeConfig.homePageUrl);
  }

  return <>{children}</>;
};

export default GuestOnlyRoute;
