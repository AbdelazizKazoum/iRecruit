"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"; // Import hooks for pathname and search params
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
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the search params as a URLSearchParams object

  const fullPathWithQuery = `${pathname}?${searchParams.toString()}`; // Combine pathname and query

  console.log("🚀 ~ fullPathWithQuery:", fullPathWithQuery);

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
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
            "justify-start"
          )}
        >
          <label htmlFor="" className=" text-black-500 ">
            {" "}
            {item.title}
          </label>
        </Link>
      ))}
    </nav>
  );
}
