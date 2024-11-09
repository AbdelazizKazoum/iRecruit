"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function ProfileSidebar({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPathWithQuery = `${pathname}?${
    searchParams.toString() || "section=compte"
  }`;

  console.log("🚀 ~ fullPathWithQuery:", fullPathWithQuery);

  return (
    <nav
      className={cn(
        "grid gap-2 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto m-4",
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
            fullPathWithQuery === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "flex lg:justify-start"
          )}
        >
          <label htmlFor="" className="text-black-600/85">
            {item.title}
          </label>
        </Link>
      ))}
    </nav>
  );
}
