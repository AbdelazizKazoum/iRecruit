export const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }
  const normalizedPath = imageUrl.startsWith("uploads/")
    ? `/${imageUrl}`
    : imageUrl;
  if (!normalizedPath.startsWith("/uploads")) {
    return imageUrl;
  }
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_API || "";
  const origin = apiBase.replace(/\/api\/?$/, "");
  return origin ? `${origin}${normalizedPath}` : normalizedPath;
};
