import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Providers from "@/components/Providers";
import React from "react";
import { auth } from "@/libs/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <Providers>
      <Header user={session?.user} />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
};

export default Layout;
