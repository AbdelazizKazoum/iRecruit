// Type Imports

// Context Imports
import { NextAuthProvider } from "@/contexts/nextAuthProvider";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      {children}
    </NextAuthProvider>
  );
};

export default Providers;
