"use client";

import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDictionary } from "@/utils/getDictionary";
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche type for listings.
import { Locale } from "@/configs/i18n";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ConcourItem } from "./ConcourItem";
import { Button } from "../ui/button";

type Filters = {
  query: string;
  region: "all" | string;
  published: "any" | "7" | "30";
};

export function ConcoursSearchList({
  offers,
  dictionary,
  locale,
  total,
  page,
  limit,
  searchParams,
}: {
  offers: ActiveTranche[]; // Active tranches displayed in the list.
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
  total: number;
  page: number;
  limit: number;
  searchParams?: {
    q?: string;
    region?: string;
    published?: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<Filters>({
    query: searchParams?.q || "",
    region: (searchParams?.region as Filters["region"]) || "all",
    published: (searchParams?.published as Filters["published"]) || "any",
  });

  const regions = useMemo(() => {
    const set = new Set<string>();
    offers.forEach((tranche) => {
      const city = tranche?.jobOffer?.city?.[locale]; // Use job offer city for region filters.
      if (city) set.add(city);
    });
    return Array.from(set);
  }, [offers, locale]);

  const totalPages = Math.max(Math.ceil(total / (limit || 1)), 1);

  const buildQueryString = (nextPage: number) => {
    const params = new URLSearchParams();
    if (filters.query.trim()) params.set("q", filters.query.trim());
    if (filters.region !== "all") params.set("region", filters.region);
    if (filters.published !== "any") params.set("published", filters.published);
    if (nextPage > 1) params.set("page", String(nextPage));
    return params.toString();
  };

  const applyFilters = (nextPage = 1) => {
    const qs = buildQueryString(nextPage);
    const url = qs ? `${pathname}?${qs}` : pathname;
    router.push(url);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(1);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white border rounded-lg p-4 shadow-sm items-end"
      >
        <div className="md:col-span-2">
          <Input
            placeholder={dictionary.concours.search.keywordPlaceholder}
            value={filters.query}
            onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
          />
        </div>
        <div>
          <Select
            value={filters.region}
            onValueChange={(value) => {
              setFilters((prev) => ({ ...prev, region: value as Filters["region"] }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={dictionary.concours.search.regionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.concours.search.regionPlaceholder}</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Select
            value={filters.published}
            onValueChange={(value: Filters["published"]) =>
              setFilters((prev) => ({ ...prev, published: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={dictionary.concours.search.dateLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{dictionary.concours.search.dateOptions.any}</SelectItem>
              <SelectItem value="7">{dictionary.concours.search.dateOptions.last7}</SelectItem>
              <SelectItem value="30">{dictionary.concours.search.dateOptions.last30}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-4 flex justify-end">
          <Button type="submit">{dictionary.concours.search.cta || "Rechercher"}</Button>
        </div>
      </form>

      {offers.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 pb-4 ">
          {/* Render one card per active tranche */}
          {offers.map((item: ActiveTranche) => (
            <ConcourItem
              tranche={item}
              dictionary={dictionary}
              key={item._id}
              className=""
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <p className="text-black-500">{dictionary.concours.noOffers}</p>
      )}

      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => applyFilters(Math.max(page - 1, 1))}
        >
          {dictionary.stepper.previous}
        </Button>
        <span className="text-sm text-muted-foreground">
          {page} / {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => applyFilters(Math.min(page + 1, totalPages))}
        >
          {dictionary.stepper.next}
        </Button>
      </div>
    </div>
  );
}
