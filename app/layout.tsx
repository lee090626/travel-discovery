import type { Metadata, Viewport } from "next";
import { AstryxProviders } from "@/components/astryx-providers";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getSiteOrigin } from "@/lib/seo";
import "./globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  title: {
    default: "여행 찾기 | 국내 여행지 탐색",
    template: "%s | 여행 찾기",
  },
  description: "지역과 테마로 국내 여행지와 행사를 가볍게 둘러보세요.",
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
  openGraph: { siteName: "여행 찾기", locale: "ko_KR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-theme="light" data-astryx-theme="neutral">
      <body>
        <AstryxProviders>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AstryxProviders>
      </body>
    </html>
  );
}
