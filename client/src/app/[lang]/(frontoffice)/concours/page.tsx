import { ConcoursSearchList } from "@/components/concours/ConcoursSearchList";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { getActiveTranches } from "@/libs/actions/tranches"; // Server action for active tranche listings.
import { ActiveTranche } from "@/types/tranche.types"; // Active tranche type for list rendering.
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const Concours = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: {
    q?: string;
    region?: string;
    published?: string;
    page?: string;
  };
}) => {
  // Get the dictionary for translations
  const dictionary = await getDictionary(params.lang);

  const { lang: locale } = params; // Resolve locale from the route params.
  const page = Number(searchParams?.page) || 1; // Read the requested page number.
  const limit = 12; // Keep the existing page size for the list UI.
  // Fetch active tranches and filter locally based on query params.
  const activeTranches = await getActiveTranches(); // Load active tranche list.

  // Normalize filters from the query string for client-side matching.
  const searchQuery = (searchParams?.q || "").trim().toLowerCase(); // Text filter from the query.
  const regionFilter = (searchParams?.region || "").trim().toLowerCase(); // Region filter from the query.
  const publishedFilter = searchParams?.published; // Published window filter from the query.

  // Apply search and filter rules to active tranches.
  const filteredTranches = activeTranches.filter((tranche: ActiveTranche) => {
    const offer = tranche.jobOffer; // Use the populated job offer for matching.
    const title = offer?.title?.[locale]?.toLowerCase() || ""; // Searchable title.
    const description = offer?.description?.[locale]?.toLowerCase() || ""; // Searchable description.
    const tag = offer?.tag?.[locale]?.toLowerCase() || ""; // Searchable tag.
    const city = offer?.city?.[locale]?.toLowerCase() || ""; // Region filter source.

    const matchesQuery = // Match query against job offer text fields.
      !searchQuery ||
      title.includes(searchQuery) ||
      description.includes(searchQuery) ||
      tag.includes(searchQuery);

    const matchesRegion = !regionFilter || city === regionFilter; // Match region if provided.

    const matchesPublished = (() => { // Match published window if provided.
      if (!publishedFilter || publishedFilter === "any") return true;
      const days = Number(publishedFilter); // Convert filter to a numeric day window.
      if (!Number.isFinite(days)) return true;
      const publishedDate = new Date(offer?.datePublication || ""); // Parse offer publish date.
      if (Number.isNaN(publishedDate.getTime())) return false;
      const diffMs = Date.now() - publishedDate.getTime(); // Compute age in ms.
      const diffDays = diffMs / (1000 * 60 * 60 * 24); // Convert age to days.
      return diffDays <= days;
    })();

    return matchesQuery && matchesRegion && matchesPublished;
  });

  // Compute pagination from the filtered list.
  const total = filteredTranches.length; // Total matches for pagination.
  const startIndex = (page - 1) * limit; // Slice start for the current page.
  const pagedTranches = filteredTranches.slice(startIndex, startIndex + limit); // Page slice for the UI.

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title={dictionary["concours"].title}
          description={dictionary["concours"].description}
        />
        <Separator className="my-6" />
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none">
            <ConcoursSearchList
              offers={pagedTranches}
              dictionary={dictionary}
              locale={locale}
              total={total}
              page={page}
              limit={limit}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concours;
