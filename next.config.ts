import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Next 16.3 caches Turbopack build output in .next/cache by default. Netlify restores that
    // directory between deploys, and a reused cache shipped stale CSS (new HTML, old styles).
    // Always build from scratch so every deploy's CSS matches its code.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
