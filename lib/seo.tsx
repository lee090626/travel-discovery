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

type FaqSource = {
  title: string;
  regionName: string;
  address?: string;
  telephone?: string;
  homepageUrl?: string;
  sourceName: string;
};

// 화면에 보이는 사실 데이터만으로 질문·답을 만든다. 없는 정보는 질문도 만들지 않는다.
export function placeFaq(item: FaqSource, themeName?: string, period?: string) {
  const faq: { question: string; answer: string }[] = [];
  faq.push({
    question: item.title + "은(는) 어디에 있나요?",
    answer: item.address ? item.title + "은(는) " + item.regionName + "에 있으며, 주소는 " + item.address + "입니다." : item.title + "은(는) " + item.regionName + "에 있습니다.",
  });
  if (period) faq.push({ question: item.title + "은(는) 언제 열리나요?", answer: "행사 기간은 " + period + "입니다. 일정은 바뀔 수 있으니 출발 전에 확인해 주세요." });
  if (themeName) faq.push({ question: item.title + "은(는) 어떤 여행지인가요?", answer: item.regionName + "의 " + themeName + " 여행지로, " + item.sourceName + "에 등록된 정보입니다." });
  if (item.telephone) faq.push({ question: item.title + " 문의 전화번호는 무엇인가요?", answer: "문의 전화번호는 " + item.telephone + "입니다." });
  if (item.homepageUrl) faq.push({ question: item.title + " 공식 홈페이지가 있나요?", answer: "네, 공식 홈페이지는 " + item.homepageUrl + " 입니다." });
  return faq;
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  };
}
