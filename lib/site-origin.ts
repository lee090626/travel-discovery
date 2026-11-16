// next.config.ts에서도 쓰므로 JSX나 Next 런타임에 의존하지 않는다.
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
