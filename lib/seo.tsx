import type { Metadata } from "next";

export function getSiteOrigin() {
  const value = process.env.SITE_URL?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost")) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function canonicalUrl(path: string) {
  const origin = getSiteOrigin();
  return origin ? new URL(path, origin).toString() : path;
}

export const SITE_NAME = "뽈뽈";

export function pageMetadata(title: string, description: string, path: string, image?: string): Metadata {
  const canIndex = Boolean(getSiteOrigin());
  const text = description.replace(/\s+/g, " ").trim().slice(0, 160);
  const url = canonicalUrl(path);
  const images = image ? [{ url: image }] : undefined;
  return {
    title,
    description: text,
    alternates: { canonical: url },
    robots: { index: canIndex, follow: canIndex },
    openGraph: { title, description: text, url, siteName: SITE_NAME, locale: "ko_KR", type: "website", images },
    twitter: { card: image ? "summary_large_image" : "summary", title, description: text, images: image ? [image] : undefined },
  };
}

// TourAPI modifiedtime(YYYYMMDDhhmmss) 또는 YYYY-MM-DD를 Date로 바꾼다.
export function parseUpdatedAt(value?: string) {
  if (!value) return undefined;
  const m = value.match(/^(\d{4})-?(\d{2})-?(\d{2})/);
  if (!m) return undefined;
  const date = new Date(m[1] + "-" + m[2] + "-" + m[3] + "T00:00:00+09:00");
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
