/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github.com",
      "images.unsplash.com",
      "picsum.photos",
      "images.pexels.com",
    ], // Add the domain you want to allow
  },
};

export default nextConfig;
