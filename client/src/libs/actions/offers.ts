"use server";

import { OfferType } from "@/types/application.types";

export async function getJobOffers(): Promise<OfferType[]> {
  try {
    const response = await fetch(`${process.env.BACKEND_API}/job-offers`, {
      next: { revalidate: 86400 }, // Revalidate every 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job offers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job offers:", error);
    return [];
  }
}

export async function getJobOfferById(
  id: string
): Promise<OfferType | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_API}/job-offers/${id}`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch job offer");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching job offer ${id}:`, error);
    return null;
  }
}
