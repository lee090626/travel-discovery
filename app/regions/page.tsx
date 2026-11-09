import type { Metadata } from "next";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { RegionCard, SectionHeading, Breadcrumbs } from "@/components/travel-ui";
import { getAllTravelItems, getAvailableRegions } from "@/lib/travel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "지역별 여행지",
  "여행지가 있는 지역을 고르고 한국관광공사 관광 정보를 둘러보세요.",
  "/regions",
);

export default async function RegionsPage() {
  const [regions, items] = await Promise.all([getAvailableRegions(), getAllTravelItems()]);
  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[{ label: "지역별" }]} />
      <header className="page-intro">
        <Heading level={1}>지역을 고르면,<br />여행이 조금 쉬워져요.</Heading>
        <Text as="p">현재 여행 정보가 준비된 지역부터 둘러보세요. 지역별 페이지에서는 테마와 장소를 이어 볼 수 있어요.</Text>
      </header>
      <section className="content-section">
        <SectionHeading title="둘러볼 지역" description={regions.length + "개 지역에서 여행 정보를 찾을 수 있어요."} />
        <div className="region-grid region-grid-large">
          {regions.map((region) => (
            <RegionCard
              key={region.slug}
              region={region}
              count={items.filter((item) => item.regionSlug === region.slug).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
