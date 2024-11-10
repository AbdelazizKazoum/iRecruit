// app/profile/error.tsx

"use client";
import { useEffect } from "react";
import AccessDenied from "@/components/errors/AccessDenied";
import NotFound from "@/components/errors/NotFound";
import SomethingWentWrong from "@/components/errors/SomethingWentWrong";

export default function Error({
  error,
}: {
  error: Error & { type?: string; digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error in profile route:", error);
  }, [error]);

  // Render the appropriate error component based on error type
  switch (error.type) {
    case "ACCESS_DENIED":
      return <AccessDenied />;
    case "NOT_FOUND":
      return <NotFound />;
    case "SOMETHING_WENT_WRONG":
    default:
      return <SomethingWentWrong />;
  }
}
