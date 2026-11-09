import type { Metadata } from "next";
import { Suspense } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceCard } from "@/components/travel-ui";
import { SearchResults } from "@/components/search-results";
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
        <Heading level={1}>궁금한 지역이나<br />여행지를 검색해요.</Heading>
        <Text as="p">장소명, 지역명, 관광 정보에 포함된 단어로 찾아볼 수 있어요.</Text>
      </header>
      <Suspense fallback={null}>
        <SearchResults entries={entries} />
      </Suspense>
    </div>
  );
}
