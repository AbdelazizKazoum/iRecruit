// Third-party Imports
import AuthRedirect from "@/components/AuthRedirect";
import { auth } from "@/libs/auth";
import { ReactNode } from "react";

// Component Imports

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const session = await auth();
  console.log("🚀 ~ AuthGuard ~ session:", session);

  return <>{session ? children : <AuthRedirect />}</>;
}