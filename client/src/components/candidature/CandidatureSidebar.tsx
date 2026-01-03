/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { buttonVariants } from "@/components/ui/button";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import { useCandidatureStore } from "@/stores/candidature.store";
import { steps } from "@/data/candidature/steps";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Import Lucid icons here
import { Check } from "lucide-react";
import { Download } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  local: Locale;
}

export function CandidatureSidebar({
  className,
  local,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPathWithQuery = `${pathname}?${
    searchParams.toString() || "section=info-personnelles"
  }`;

  const { candidatureData, loading } = useCandidatureStore();
  const { data: session } = useSession();
  const [downloading, setDownloading] = useState(false);

  if (loading)
    return (
      <nav
        className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto ",
          className
        )}
        {...props}
      >
        <Skeleton className="h-5 min-w-40 w-full " />
        <Skeleton className="h-5 min-w-40 w-full " />
      </nav>
    );

  return (
    <nav
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-1 max-w-2xl m-auto ",
        className
      )}
      {...props}
    >
      {steps.map((item) => {
        const Icon = item.icon;
        // Determine the icon to display based on validation
        const isValid =
          (item.href === "/candidature?section=info-personnelles" &&
            candidatureData?.personalInformation?.valid) ||
          (item.href === "/candidature?section=info-professionnelles" &&
            candidatureData?.professionalInformation?.valid);

        return (
          <Link
            key={item.href}
            href={`/${local}${item.href}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              fullPathWithQuery === `/${local}${item.href}` ? "" : "",
              "flex items-center lg:justify-start hover:bg-transparent  "
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center min-w-10 h-10 mr-2 bg-primary/15 rounded text-primary",
                fullPathWithQuery === `/${local}${item.href}` &&
                  "text-white-500 bg-primary  ",
                isValid && "text-white-500 bg-green-500 "
              )}
            >
              {/* Use valid icon when validation is true */}
              {isValid ? <Check /> : <Icon />}
            </div>
            <span
              className={cn(
                "text-muted-foreground",
                fullPathWithQuery === `/${local}${item.href}` &&
                  "text-black-600/80"

                // isValid && "text-green-500"
              )}
            >
              {item.title[local]}
            </span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={async () => {
          if (!session?.user?.accessToken) {
            alert("Vous devez être connecté pour générer le CV.");
            return;
          }
          setDownloading(true);
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/candidature/resume-pdf`,
              {
                headers: {
                  Authorization: `Bearer ${session.user.accessToken}`,
                },
              }
            );

            if (!res.ok) {
              const text = await res.text();
              throw new Error(text || res.statusText);
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "cv-ats.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          } catch (err) {
            console.error("Download resume template failed", err);
            alert("Impossible de générer le CV. Réessayez plus tard.");
          } finally {
            setDownloading(false);
          }
        }}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "flex items-center justify-center gap-2 border-dashed"
        )}
        disabled={downloading}
      >
        <Download size={18} />
        <span>
          {downloading
            ? "Génération du CV..."
            : "Télécharger le CV ATS généré"}
        </span>
      </button>
    </nav>
  );
}
