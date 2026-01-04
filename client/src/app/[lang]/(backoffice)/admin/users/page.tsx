import React from "react";
import { unstable_cache } from "next/cache";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { Users } from "lucide-react";
import { UsersTable } from "@/components/Layout/admin/users/UsersTable";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";

const USERS_CACHE_SECONDS = 60;

const fetchUsers = async (token: string): Promise<UserType[]> => {
  const apiBase =
    process.env.BACKEND_API ?? process.env.NEXT_PUBLIC_BACKEND_API;
  if (!apiBase) {
    const error = new Error("Backend API base URL is not configured.");
    (error as { status?: number }).status = 500;
    throw error;
  }

  const response = await fetch(`${apiBase}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "force-cache",
    next: { revalidate: USERS_CACHE_SECONDS },
  });

  if (!response.ok) {
    const error = new Error("Failed to fetch users.");
    (error as { status?: number }).status = response.status;
    throw error;
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

// Cache the full users list per access token to reduce round-trips.
const getCachedUsers = unstable_cache(
  async (token: string) => fetchUsers(token),
  ["admin-users"],
  { revalidate: USERS_CACHE_SECONDS }
);

interface UsersPageProps {
  params: {
    lang: Locale;
  };
}

export default async function UsersPage({ params: { lang } }: UsersPageProps) {
  const dictionary = await getDictionary(lang);
  let users: UserType[] = [];
  let usersError: string | null = null;
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    usersError = "Unauthorized. Please sign in again.";
  } else {
    try {
      users = await getCachedUsers(accessToken);
    } catch (error: unknown) {
      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof (error as { status?: number }).status === "number"
          ? (error as { status?: number }).status
          : undefined;
      usersError =
        status === 401
          ? "Unauthorized. Please sign in again."
          : "Failed to load users.";
    }
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
