/* eslint-disable @typescript-eslint/no-explicit-any */

import { displayFile } from "./displayFile";
import { downloadFile } from "./downloadFile";

// File open
export const handleOpenFile = async (value: any) => {
  console.log("🚀 ~ handleOpenFile ~ value:", value);

  if (typeof value == "string") {
    try {
      // Download the file if value is a URL or path
      const file = await downloadFile(value);

      if (file instanceof Blob) {
        displayFile(file);
      } else {
        console.error("Downloaded file is not a Blob");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  } else {
    if (value) {
      if (value instanceof Blob) {
        // If it's a Blob, create an object URL
        const fileURL = URL.createObjectURL(value);
        window.open(fileURL, "_blank");

        // Optionally, revoke the object URL later to free memory
        setTimeout(() => URL.revokeObjectURL(fileURL), 10000); // Adjust timeout as needed
      } else if (typeof value === "string") {
        // If it's already a URL
        window.open(value, "_blank");
      } else {
        console.error("Unsupported file type");
      }
    } else {
      console.error(`File not found for key: ${value}`);
    }
  }
};
