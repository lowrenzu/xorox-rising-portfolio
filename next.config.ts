import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
