import React from "react";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { Users } from "lucide-react";
import { UsersTable } from "@/components/Layout/admin/users/UsersTable";
import serverApi from "@/libs/serverApi";
import { UserType } from "@/types/user.types";

interface UsersPageProps {
  params: {
    lang: Locale;
  };
}

export default async function UsersPage({ params: { lang } }: UsersPageProps) {
  const dictionary = await getDictionary(lang);
  let users: UserType[] = [];
  let usersError: string | null = null;

  try {
    const { data } = await serverApi.get("/users");
    users = Array.isArray(data) ? data : [];
  } catch (error: any) {
    const status = error?.response?.status;
    usersError =
      status === 401
        ? "Unauthorized. Please sign in again."
        : "Failed to load users.";
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {dictionary.usersPage.title}
          </h1>
        </div>
        <p className="text-muted-foreground ml-14">
          Manage your application users, roles, and permissions.
        </p>
      </div>

      {/* Users Table Component */}
      <UsersTable
        dictionary={dictionary}
        lang={lang}
        initialUsers={users}
        initialError={usersError}
        initialLoaded
      />
    </div>
  );
}
