"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Locale } from "@/configs/i18n";
import { motion } from "framer-motion";
import { cn } from "@/libs/utils";
import type { getDictionary } from "@/utils/getDictionary";

interface AdminLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export default function AdminLayout({
  children,
  lang,
  dictionary,
}: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRtl = lang === "ar";

  return (
    <div
      className="min-h-screen bg-muted/40 dark:bg-muted/10"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-20 bg-black-600 border-white/10",
          isRtl ? "right-0 border-l" : "left-0 border-r"
        )}
      >
        <AdminSidebar
          lang={lang}
          dictionary={dictionary}
          className="h-full border-none"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={cn(
              "relative flex w-64 flex-col bg-black-600 h-full shadow-xl duration-300 border-white/10",
              isRtl
                ? "animate-in slide-in-from-right border-l"
                : "animate-in slide-in-from-left border-r"
            )}
          >
            <AdminSidebar
              lang={lang}
              dictionary={dictionary}
              className="h-full border-none"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          isRtl ? "md:pr-64" : "md:pl-64"
        )}
      >
        <AdminHeader
          onMenuClick={() => setIsMobileMenuOpen(true)}
          dictionary={dictionary}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-7xl"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
