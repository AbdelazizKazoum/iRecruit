"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Locale } from "@/configs/i18n";

interface AdminLayoutProps {
  children: React.ReactNode;
  lang: Locale;
}

export default function AdminLayout({ children, lang }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-20">
        <AdminSidebar lang={lang} className="h-full" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex w-64 flex-col bg-background h-full shadow-xl animate-in slide-in-from-left duration-300">
            <AdminSidebar lang={lang} className="h-full border-r-0" />
          </div>
        </div>
      )}

      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
