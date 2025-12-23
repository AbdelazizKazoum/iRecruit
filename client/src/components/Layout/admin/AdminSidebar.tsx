"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { getDictionary } from "@/utils/getDictionary";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function AdminSidebar({ className, lang, dictionary }: SidebarProps) {
  const pathname = usePathname();
  const { adminSidebar } = dictionary;
  const isRtl = lang === "ar";

  const sidebarGroups = [
    {
      label: adminSidebar.overview,
      items: [
        {
          title: adminSidebar.dashboard,
          href: `/${lang}/admin`,
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: adminSidebar.management,
      items: [
        {
          title: adminSidebar.users,
          href: `/${lang}/admin/users`,
          icon: Users,
        },
        {
          title: adminSidebar.jobOffers,
          href: `/${lang}/admin/job-offers`,
          icon: Briefcase,
        },
        {
          title: adminSidebar.applications,
          href: `/${lang}/admin/applications`,
          icon: FileText,
        },
      ],
    },
    {
      label: adminSidebar.system,
      items: [
        {
          title: adminSidebar.settings,
          href: `/${lang}/admin/settings`,
          icon: Settings,
        },
        {
          title: adminSidebar.rolesPermissions,
          href: `/${lang}/admin/roles`,
          icon: Shield,
        },
      ],
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "flex flex-col h-full border-white/10 bg-black-600 text-white",
        isRtl ? "border-l" : "border-r",
        className
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            iR
          </div>
          <span className=" text-white-500 ">iRecruit</span>
        </div>
      </div>

      {/* Navigation Section */}
      <ScrollArea className="flex-1 py-4">
        <div className="px-4 space-y-6">
          {sidebarGroups.map((group, i) => (
            <div dir={isRtl ? "rtl" : "ltr"} key={i} className="space-y-2">
              <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-white shadow-md hover:bg-primary/90"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive ? "text-white" : "text-gray-400"
                          )}
                        />
                        {item.title}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 bg-black-500/10 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/5"
          asChild
        >
          <Link href="#">
            <HelpCircle className="h-4 w-4" />
            {adminSidebar.helpSupport}
          </Link>
        </Button>

        <div className="flex items-center gap-3 p-2 rounded-lg border border-white/10 bg-white/5 shadow-sm">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback className="bg-primary text-white">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-white-500">
              Admin User
            </p>
            <p className="text-xs text-gray-400 truncate">admin@irecruit.com</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
