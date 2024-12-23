export function displayFile(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank"); // Open the file in a new window or tab

  // Optionally, revoke the object URL later to free memory
  setTimeout(() => URL.revokeObjectURL(url), 10000); // Adjust timeout as needed
}
