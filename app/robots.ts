import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

// 검색엔진과 생성형 AI 검색(답변 엔진) 크롤러를 명시적으로 허용한다.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Yeti"];

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  if (!origin) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: AI_CRAWLERS, allow: "/" }],
    sitemap: origin + "/sitemap.xml",
  };
}
