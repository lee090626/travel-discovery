import type { NextConfig } from "next";
import { getSiteOrigin } from "./lib/site-origin";

// SITE_URL이 없거나 잘못되면 사이트 전체가 noindex로, 사이트맵과 canonical 없이 빌드된다.
if (process.env.NODE_ENV === "production" && !getSiteOrigin()) {
  console.warn("\n⚠ SITE_URL이 없거나 https 주소가 아닙니다. 색인 차단(noindex) 모드로 빌드하며 사이트맵과 canonical이 비어 있습니다.\n");
}

const nextConfig: NextConfig = {
  output: "export",
  turbopack: { root: process.cwd() },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "tong.visitkorea.or.kr" }],
  },
};

export default nextConfig;
