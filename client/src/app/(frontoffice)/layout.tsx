import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Providers from "@/components/Providers";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Header />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
};

export default Layout;
