// app/profile/error.tsx

"use client";
import { useEffect } from "react";
import AccessDenied from "@/components/errors/AccessDenied";
import NotFound from "@/components/errors/NotFound";
import SomethingWentWrong from "@/components/errors/SomethingWentWrong";
import { ERROR_MESSAGES } from "@/utils/constants/errorTypes";

export default function Error({
  error,
}: {
  error: Error & { type?: string; digest?: string };
  reset: () => void;
}) {
  console.log("🚀 ~ error: message", error.message);
  useEffect(() => {
    console.error("Error in profile message:", error.message);
  }, [error]);

  // Render the appropriate error compo''nent based on error type
  switch (error.message) {
    case "401":
      return <AccessDenied message={ERROR_MESSAGES.ACCESS_DENIED.message} />;
    case "404":
      return <NotFound message={ERROR_MESSAGES.NOT_FOUND.message} />;
    case "500":
    default:
      return (
        <SomethingWentWrong
          message={error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG.message}
        />
      );
  }
}
