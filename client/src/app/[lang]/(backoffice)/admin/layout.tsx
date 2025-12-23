import AdminLayout from "@/components/Layout/admin/AdminLayout";
import Providers from "@/components/Providers";
import { Locale } from "@/configs/i18n";
import AuthGuard from "@/hocs/AuthGuard";
import { ChildrenType } from "@/types/types";
import React from "react";

const Layout = async ({
  children,
  params,
}: ChildrenType & { params: { lang: Locale } }) => {
  return (
    <Providers>
      <AuthGuard locale={params.lang}>
        <AdminLayout lang={params.lang}>{children}</AdminLayout>
      </AuthGuard>
    </Providers>
  );
};

export default Layout;
