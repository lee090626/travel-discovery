import type { Metadata } from "next";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, CollectionCard, SectionHeading } from "@/components/travel-ui";
import { getCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "뽈뽈이가 고른 여행지 모음",
  "비 오는 날 갈 만한 곳, 걷기 좋은 역사 산책길처럼 상황별로 골라 둔 국내 여행지 모음이에요.",
  "/collections",
);

export default async function CollectionsPage() {
  const collections = await getCollections();
  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[{ label: "여행지 모음" }]} />
      <header className="page-intro">
        <img className="intro-mascot" src="/mascot-map.svg" alt="지도를 펼친 뽈뽈이" width={160} height={130} />
        <Heading level={1}>뽈뽈이가 골라 둔<br />여행지 모음이에요.</Heading>
        <Text as="p">상황과 기분에 맞춰 함께 둘러보기 좋은 장소를 묶어 두었어요.</Text>
      </header>
      <section className="content-section last-section">
        <SectionHeading title="여행지 모음" description={collections.length + "개 모음"} />
        <div className="region-grid collection-grid">
          {collections.map(({ collection, items }, index) => (
            <CollectionCard key={collection.slug} index={index} slug={collection.slug} title={collection.title} summary={collection.summary} count={items.length} />
          ))}
        </div>
      </section>
    </div>
  );
}
