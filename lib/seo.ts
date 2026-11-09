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

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canIndex = Boolean(getSiteOrigin());
  return {
    title,
    description: description.replace(/\s+/g, " ").trim().slice(0, 160),
    alternates: { canonical: canonicalUrl(path) },
    robots: { index: canIndex, follow: canIndex },
  };
}
