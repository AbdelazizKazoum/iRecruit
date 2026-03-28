"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useApplicationStore } from "@/stores/useApplication.store";
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche for apply navigation.
import { Locale } from "@/configs/i18n";
import React from "react";

type ApplyButtonProps = {
  tranche: ActiveTranche; // Tranche context for the apply flow.
  locale: Locale;
  label: string;
  className?: string;
};

export default function ApplyButton({
  tranche,
  locale,
  label,
  className,
}: ApplyButtonProps) {
  const router = useRouter();
  const { setOffer, setTranche } = useApplicationStore(); // Store both offer and tranche context.

  const handleApply = React.useCallback(() => {
    setTranche(tranche); // Persist tranche context for the apply flow.
    setOffer(tranche.jobOffer); // Keep the offer data used in the application steps.
    router.push(`/${locale}/postuler`);
  }, [locale, router, setOffer, setTranche, tranche]);

  return (
    <Button className={className} onClick={handleApply}>
      {label}
    </Button>
  );
}
