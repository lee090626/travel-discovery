import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: { root: process.cwd() },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "tong.visitkorea.or.kr" }],
  },
};

export default nextConfig;
