import type { Metadata, Viewport } from "next";
import { AstryxProviders } from "@/components/astryx-providers";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getSiteOrigin } from "@/lib/seo";
import "./globals.css";

const siteOrigin = getSiteOrigin();
// Search Console / 네이버 서치어드바이저 소유 확인 코드. 빌드 환경변수로 넣는다.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const naverVerification = process.env.NAVER_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  title: {
    default: "뽈뽈 | 국내 여행지 탐색",
    template: "%s | 뽈뽈",
  },
  description: "지역과 테마로 국내 여행지와 행사를 가볍게 둘러보세요.",
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
  openGraph: { siteName: "뽈뽈", locale: "ko_KR", type: "website" },
  verification: {
    google: googleVerification || undefined,
    other: naverVerification ? { "naver-site-verification": naverVerification } : undefined,
  },
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
