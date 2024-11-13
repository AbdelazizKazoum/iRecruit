/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: any;
  }[];
}

export function CandidatureSidebar({
  className,
  items,
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
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto ",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            fullPathWithQuery === item.href ? "" : "",
            "flex items-center lg:justify-start hover:bg-transparent  "
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 mr-2 bg-primary/15 rounded text-primary",
              fullPathWithQuery === item.href && "text-white-500 bg-primary  "
            )}
          >
            {item.icon}
          </div>
          <span
            className={cn(
              "text-muted-foreground",
              fullPathWithQuery === item.href && "text-black-600/80"
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
