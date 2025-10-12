import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Allow data URLs for uploaded images */
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
