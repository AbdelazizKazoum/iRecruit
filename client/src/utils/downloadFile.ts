import clientApi from "@/libs/clientApi";
import { toast } from "react-toastify";

export async function downloadFile(filePath: string): Promise<Blob | null> {
  try {
    const response = await clientApi.post(
      "candidature/files", // Replace with your backend URL
      { filePath },
      {
        responseType: "blob", // Ensures the response is a Blob
      }
    );

    return response.data; // Return the Blob (the file data)
  } catch (error) {
    console.error("Error fetching the file:", error);
    toast.error("Failed to fetch file");
    return null;
  }
}
