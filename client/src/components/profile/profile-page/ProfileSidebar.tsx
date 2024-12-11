"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";
import { Locale } from "@/configs/i18n";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  locale: Locale;
  items: {
    href: string;
    title: { en: string; ar: string; fr: string };
  }[];
}

export function ProfileSidebar({
  className,
  items,
  locale,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPathWithQuery = `${pathname}?${
    searchParams.toString() || "section=compte"
  }`;

  return (
    <nav
      className={cn(
        "grid gap-2 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={`/${locale}` + item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            fullPathWithQuery === `/${locale}${item.href}`
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "flex lg:justify-start"
          )}
        >
          <label htmlFor="" className="text-black-600/85">
            {item.title[locale]}
          </label>
        </Link>
      ))}
    </nav>
  );
}
