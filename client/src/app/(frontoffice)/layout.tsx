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
      <main>
        {/* Bubble overlay effect */}
        {/* Bubble container */}
        <div className="bubble-overlay">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
          <div className="bubble bubble-7"></div>
          <div className="bubble bubble-8"></div>
          <div className="bubble bubble-9"></div>
          <div className="bubble bubble-10"></div>
          <div className="bubble bubble-11"></div>
          <div className="bubble bubble-12"></div>
          <div className="bubble bubble-13"></div>
          <div className="bubble bubble-14"></div>
          <div className="bubble bubble-15"></div>
          <div className="bubble bubble-16"></div>
          <div className="bubble bubble-17"></div>
          <div className="bubble bubble-18"></div>
          <div className="bubble bubble-19"></div>
          <div className="bubble bubble-20"></div>
        </div>
        {children}
      </main>
      <Footer />
    </Providers>
  );
};

export default Layout;
