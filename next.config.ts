import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static hosting compatibility
  trailingSlash: true,
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
