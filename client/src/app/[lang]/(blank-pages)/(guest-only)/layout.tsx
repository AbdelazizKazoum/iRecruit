import Providers from "@/components/Providers";
import GuestOnlyRoute from "@/hocs/GuestOnlyRoute";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Providers>
      <GuestOnlyRoute>{children}</GuestOnlyRoute>
    </Providers>
  );
};

export default Layout;
