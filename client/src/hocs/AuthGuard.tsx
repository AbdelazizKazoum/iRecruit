// Third-party Imports
import AuthRedirect from "@/components/AuthRedirect";
import { Locale } from "@/configs/i18n";
import { auth } from "@/libs/auth";
import { ChildrenType } from "@/types/types";

// Component Imports

export default async function AuthGuard({
  children,
  locale,
}: ChildrenType & { locale: Locale }) {
  const session = await auth();

  return <>{session ? children : <AuthRedirect lang={locale} />}</>;
}
