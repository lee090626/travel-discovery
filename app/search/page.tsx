import type { Metadata } from "next";
import { Suspense } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceCard } from "@/components/travel-ui";
import { SearchResults } from "@/components/search-results";
import { SearchForm } from "@/components/astryx-search-form";
import { getAllTravelItems } from "@/lib/travel";

export const metadata: Metadata = {
  title: "여행지 검색",
  description: "지역이나 여행지 이름으로 국내 관광 정보를 검색해 보세요.",
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const entries = (await getAllTravelItems()).map((item) => ({
    id: item.id,
    haystack: [item.title, item.regionName, item.address, item.description].join(" ").toLocaleLowerCase("ko-KR"),
    card: <PlaceCard item={item} />,
  }));

  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[{ label: "여행지 검색" }]} />
      <header className="page-intro search-intro">
        <img className="intro-mascot" src="/mascot-search.svg" alt="돋보기를 든 뽈뽈이" width={160} height={130} />
        <Heading level={1}>궁금한 지역이나<br />여행지를 검색해요.</Heading>
        <Text as="p">장소명, 지역명, 관광 정보에 포함된 단어로 찾아볼 수 있어요.</Text>
      </header>
      {/* 검색어는 클라이언트에서 읽으므로, 그 전에도 검색 폼이 HTML과 첫 화면에 보이게 한다. */}
      <Suspense fallback={<><SearchForm /><Text as="p" className="search-hint">검색어 예: 부산, 바다, 한옥마을</Text></>}>
        <SearchResults entries={entries} />
      </Suspense>
      {/* 정적 사이트라 결과는 브라우저에서만 계산된다. 자바스크립트가 꺼져 있으면 둘러볼 곳을 안내한다. */}
      <noscript>
        <Text as="p" className="search-hint">검색 결과는 자바스크립트가 켜져 있어야 보여요. <a href="/">홈</a>이나 <a href="/themes">테마별 여행지</a>에서 둘러보세요.</Text>
      </noscript>
    </div>
  );
}
