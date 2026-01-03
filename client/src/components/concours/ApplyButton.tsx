"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useApplicationStore } from "@/stores/useApplication.store";
import { OfferType } from "@/types/application.types";
import { Locale } from "@/configs/i18n";
import React from "react";

type ApplyButtonProps = {
  offer: OfferType;
  locale: Locale;
  label: string;
  className?: string;
};

export default function ApplyButton({
  offer,
  locale,
  label,
  className,
}: ApplyButtonProps) {
  const router = useRouter();
  const { setOffer } = useApplicationStore();

  const handleApply = React.useCallback(() => {
    setOffer(offer);
    router.push(`/${locale}/postuler`);
  }, [locale, offer, router, setOffer]);

  return (
    <Button className={className} onClick={handleApply}>
      {label}
    </Button>
  );
}
