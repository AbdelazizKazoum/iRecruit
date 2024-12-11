export const getLanguageFromPath = () => {
  const path = window.location.href;

  // Use the URL API to parse the path
  const url = new URL(path, window.location.origin);
  // Split the pathname into segments
  const segments = url.pathname.split("/").filter(Boolean);
  // Return the first segment as the language code
  return segments[0] || null;
};
