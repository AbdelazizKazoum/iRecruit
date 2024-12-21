/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";
import { BriefcaseBusiness, Users } from "lucide-react";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";

const steps = [
  {
    title: {
      en: "Personal Information",
      fr: "Informations Personnelles",
      ar: "المعلومات الشخصية",
    },
    href: "/candidature?section=info-personnelles",
    icon: <Users />,
  },
  {
    title: {
      en: "Qualifications/Experiences",
      fr: "Qualifications/Expériences",
      ar: "المؤهلات/الخبرات",
    },
    href: "/candidature?section=info-professionnelles",
    icon: <BriefcaseBusiness />,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  local: Locale;
}

export function CandidatureSidebar({
  className,
  // dictionary,
  local,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPathWithQuery = `${pathname}?${
    searchParams.toString() || "section=info-personnelles"
  }`;

  return (
    <nav
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto ",
        className
      )}
      {...props}
    >
      {steps.map((item) => (
        <Link
          key={item.href}
          href={`/${local}${item.href}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            fullPathWithQuery === `/${local}${item.href}` ? "" : "",
            "flex items-center lg:justify-start hover:bg-transparent  "
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center min-w-10 h-10 mr-2 bg-primary/15 rounded text-primary",
              fullPathWithQuery === `/${local}${item.href}` &&
                "text-white-500 bg-primary  "
            )}
          >
            {item.icon}
          </div>
          <span
            className={cn(
              "text-muted-foreground",
              fullPathWithQuery === `/${local}${item.href}` &&
                "text-black-600/80"
            )}
          >
            {item.title[local]}
          </span>
        </Link>
      ))}
    </nav>
  );
}
