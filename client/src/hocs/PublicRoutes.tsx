// Next Imports

// Third-party Imports
import { auth } from "@/libs/auth";

// Type Imports
import { ReactNode } from "react";

const PublicRoutes = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session === undefined) {
    // return <LoadingPage />;
  }

  return <>{children}</>;
};

export default PublicRoutes;
