import { getSiteOrigin } from "@/lib/seo";
import { getCollections } from "@/lib/collections";
import { getAllTravelItems, getAvailableRegions, getRegionItems, getThemesWithItems } from "@/lib/travel";

export const dynamic = "force-static";

// llms.txt: 생성형 AI가 사이트 구조와 주요 페이지를 파악하도록 돕는 요약 문서.
export async function GET() {
  const origin = getSiteOrigin() || "";
  const [regions, items, collections] = await Promise.all([getAvailableRegions(), getAllTravelItems(), getCollections()]);
  const regionLines = await Promise.all(regions.map(async (region) => {
    const count = (await getRegionItems(region.slug)).length;
    return "- [" + region.name + " 여행지](" + origin + "/regions/" + region.slug + "): " + count + "곳";
  }));
  const themeLines = getThemesWithItems(items)
    .filter((group) => group.items.length >= 2)
    .map(({ theme, items: themeItems }) => "- [" + theme.name + "](" + origin + "/themes/" + theme.slug + "): " + theme.description + " (" + themeItems.length + "곳)");

  const body = [
    "# 여행 찾기",
    "",
    "> 한국관광공사 TourAPI에 등록된 국내 관광지·문화시설·레포츠·행사 정보를 지역과 테마별로 정리한 여행 탐색 사이트입니다. 각 장소 페이지에 주소, 문의처, 행사 기간, 원문 출처를 함께 제공합니다.",
    "",
    "- 데이터 출처: 한국관광공사 TourAPI (공공누리 이용조건 표시)",
    "- 장소 수: " + items.length + "곳",
    "- 장소 상세 URL 형식: " + origin + "/places/{id}",
    "- 전체 목록: " + origin + "/sitemap.xml",
    "",
    "## 지역",
    ...regionLines,
    "",
    "## 테마",
    ...themeLines,
    "",
    "## 여행지 모음",
    ...collections.map(({ collection, items: collectionItems }) => "- [" + collection.title + "](" + origin + "/collections/" + collection.slug + "): " + collection.summary + " (" + collectionItems.length + "곳)"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
