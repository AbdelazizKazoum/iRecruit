"use client";
import React from "react";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <header className="space-y-0.5">
      {/* Breadcrumb Navigation */}

      {/* Page Title */}
      <h2 className="text-2xl font-bold text-black-600/90">{title}</h2>

      {/* Page Description */}
      <p className="text-muted-foreground">{description}</p>
    </header>
  );
};

export default PageHeader;
