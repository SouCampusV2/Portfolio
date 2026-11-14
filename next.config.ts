import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Screenshots are full of small text: allow a higher quality than the default 75.
  images: { qualities: [75, 92] },
};

export default nextConfig;
