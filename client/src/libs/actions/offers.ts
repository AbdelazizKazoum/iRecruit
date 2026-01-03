"use server";

import { OfferType } from "@/types/application.types";

type OffersQuery = {
  search?: string;
  region?: string;
  published?: string;
  page?: number;
  limit?: number;
};

export type OfferListResponse = {
  data: OfferType[];
  total: number;
  page: number;
  limit: number;
};

export async function getJobOffers(
  query: OffersQuery = {}
): Promise<OfferListResponse> {
  try {
    const params = new URLSearchParams();
    if (query.search) params.append("search", query.search);
    if (query.region) params.append("region", query.region);
    if (query.published) params.append("published", query.published);
    if (query.page) params.append("page", String(query.page));
    if (query.limit) params.append("limit", String(query.limit));

    const response = await fetch(
      `${process.env.BACKEND_API}/job-offers${params.toString() ? `?${params.toString()}` : ""}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch job offers");
    }

    const data = await response.json();
    // Ensure backward compatibility if API temporarily returns an array
    if (Array.isArray(data)) {
      return { data, total: data.length, page: 1, limit: data.length || 1 };
    }
    return data as OfferListResponse;
  } catch (error) {
    console.error("Error fetching job offers:", error);
    return { data: [], total: 0, page: 1, limit: query.limit || 10 };
  }
}
