import React from "react";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import AdminDashboardContent from "@/components/Layout/admin/AdminDashboardContent";

export default async function AdminDashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <AdminDashboardContent lang={lang} dictionary={dictionary} />;
}
