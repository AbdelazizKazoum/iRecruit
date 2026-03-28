/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobOffersTable } from "./JobOffersTable";
import { CreateJobOfferModal } from "./CreateJobOfferModal";
import { Locale } from "@/configs/i18n";

interface JobOffersClientProps {
  dictionary: any;
  lang: Locale;
}

export function JobOffersClient({ dictionary, lang }: JobOffersClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {dictionary.offersPage.title}
            </h1>
          </div>
          <p className="text-muted-foreground ml-14">
            {dictionary.offersPage.subtitle}
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {dictionary.adminDashboard.postJob}
        </Button>
      </div>

      {/* Job Offers Table Component */}
      <JobOffersTable dictionary={dictionary} lang={lang} />

      {/* Create Job Offer Modal */}
      <CreateJobOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dictionary={dictionary}
      />
    </div>
  );
}
