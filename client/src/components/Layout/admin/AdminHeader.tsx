"use client";

import React from "react";
import { LanguageDropdown } from "@/components/Layout/shared/LanguageDropdown";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search, ChevronRight, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/libs/utils";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    // Remove lang segment (first one)
    const cleanSegments = segments.slice(1);

    return (
      <div className="hidden md:flex items-center text-sm text-muted-foreground">
        <Link
          href={`/${segments[0]}/admin`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
        </Link>
        {cleanSegments.map((segment, index) => {
          const isLast = index === cleanSegments.length - 1;
          const href = `/${segments[0]}/${cleanSegments
            .slice(0, index + 1)
            .join("/")}`;

          return (
            <React.Fragment key={segment}>
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
              <Link
                href={href}
                className={cn(
                  "capitalize hover:text-foreground transition-colors",
                  isLast && "font-medium text-foreground pointer-events-none"
                )}
              >
                {segment.replace(/-/g, " ")}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex flex-1 items-center gap-4">
        {generateBreadcrumbs()}
        <div className="flex-1 md:ml-auto md:flex-none">
          {/* Mobile Search or just spacer */}
        </div>
        <form className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-muted/50 pl-8 md:w-[200px] lg:w-[300px] focus:bg-background transition-colors"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

        <LanguageDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all"
            >
              <Avatar className="h-9 w-9 border">
                <AvatarImage src="/avatars/01.png" alt="@admin" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@irecruit.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
