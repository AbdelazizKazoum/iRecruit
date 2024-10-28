import Providers from "@/components/Providers";
import AuthGuard from "@/hocs/AuthGuard";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

    
  return (
    <Providers>
      <AuthGuard>{children}</AuthGuard>
    </Providers>
  );
};

export default Layout;
