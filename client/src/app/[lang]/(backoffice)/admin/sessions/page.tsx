import React from "react";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { Calendar } from "lucide-react";
import { SessionsTable } from "@/app/[lang]/(backoffice)/admin/sessions/components/SessionsTable";

interface SessionsPageProps {
  params: {
    lang: Locale;
  };
}

export default async function SessionsPage({
  params: { lang },
}: SessionsPageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sessions Management
          </h1>
        </div>
        <p className="text-muted-foreground ml-14">
          Manage job offer sessions, interviews, and application processes.
        </p>
      </div>

      {/* Sessions Table Component */}
      <SessionsTable dictionary={dictionary} lang={lang} />
    </div>
  );
}