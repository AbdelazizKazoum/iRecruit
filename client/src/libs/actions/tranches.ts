"use server";

import { ActiveTranche } from "@/types/tranche.types"; // Active tranche payload shape.

// Fetch the current list of active tranches for public listings.
export async function getActiveTranches(): Promise<ActiveTranche[]> {
  try {
    // Call the backend active tranche endpoint with a short cache window.
    const response = await fetch(`${process.env.BACKEND_API}/tranche/active`, {
      next: { revalidate: 300 }, // Revalidate frequently to keep listings fresh.
    });

    if (!response.ok) {
      throw new Error("Failed to fetch active tranches"); // Surface a consistent error message.
    }

    const data = await response.json(); // Parse the backend response.
    // Normalize to an array for safe rendering.
    return Array.isArray(data) ? (data as ActiveTranche[]) : [];
  } catch (error) {
    // Log and return an empty list to keep the UI stable.
    console.error("Error fetching active tranches:", error);
    return [];
  }
}

// Fetch a single tranche (with session + job offer populated) for details pages.
export async function getTrancheById(id: string): Promise<ActiveTranche | null> {
  try {
    // Call the backend tranche detail endpoint.
    const response = await fetch(`${process.env.BACKEND_API}/tranche/${id}`, {
      next: { revalidate: 300 }, // Keep the detail page reasonably fresh.
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tranche"); // Surface a consistent error message.
    }

    const data = await response.json(); // Parse tranche data with populated fields.
    return data as ActiveTranche;
  } catch (error) {
    // Log and return null so the page can show a 404.
    console.error(`Error fetching tranche ${id}:`, error);
    return null;
  }
}
