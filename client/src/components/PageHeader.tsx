"use client";
import { cn } from "@/libs/utils";
import React from "react";

const PageHeader = ({
  title,
  description,
  size,
}: {
  title: string;
  description: string;
  size?: string;
}) => {
  return (
    <header className="space-y-0.5">
      {/* Breadcrumb Navigation */}

      {/* Page Title */}
      {size === "sm" ? (
        <h3 className={`text-lg font-medium text-black-600/85`}> {title}</h3>
      ) : (
        <h2 className="text-2xl font-bold text-black-600/90">{title}</h2>
      )}

      {/* Page Description */}
      <p className={cn(`text-muted-foreground`, size == "sm" ? "text-sm" : "")}>
        {description}
      </p>
    </header>
  );
};

export default PageHeader;
