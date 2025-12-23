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
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

export function AdminSidebar({ className, lang }: SidebarProps) {
  const pathname = usePathname();

  const sidebarItems = [
    {
      title: "Dashboard",
      href: `/${lang}/admin`,
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: `/${lang}/admin/users`,
      icon: Users,
    },
    {
      title: "Job Offers",
      href: `/${lang}/admin/job-offers`,
      icon: Briefcase,
    },
    {
      title: "Applications",
      href: `/${lang}/admin/applications`,
      icon: FileText,
    },
    {
      title: "Settings",
      href: `/${lang}/admin/settings`,
      icon: Settings,
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-card", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-6 px-4 flex items-center gap-2">
            {/* You can replace this with your Logo component */}
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                iR
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary">
              iRecruit
            </h2>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href &&
                    "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-4 w-full px-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
