import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Providers from "@/components/Providers";
import PublicRoutes from "@/hocs/PublicRoutes";
import React from "react";
import { auth } from "@/libs/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <Providers>
      <PublicRoutes>
        <Header user={session?.user} />
        <main>{children}</main>
        <Footer />
      </PublicRoutes>
    </Providers>
  );
};

export default Layout;
