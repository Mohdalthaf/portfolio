import type { NextConfig } from "next";

// Static media rarely changes — let browsers/CDN keep it for 30 days instead
// of revalidating every file on each visit. If you replace an image, give it
// a new filename so visitors pick it up immediately.
const mediaCache = {
  key: "Cache-Control",
  value: "public, max-age=2592000, stale-while-revalidate=86400",
};

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      { source: "/scroll-animation-frames/:path*", headers: [mediaCache] },
      { source: "/assets/:path*", headers: [mediaCache] },
    ];
  },
};

export default nextConfig;
