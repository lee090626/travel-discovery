import type { Metadata } from "next";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { SearchForm } from "@/components/astryx-search-form";
import { CollectionCard, FeaturedPlace, RegionCard, SectionHeading, ThemePill } from "@/components/travel-ui";
import { getCollections } from "@/lib/collections";
import { getAllTravelItems, getAvailableRegions, getThemesWithItems } from "@/lib/travel";
import { JsonLd, SITE_NAME, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default async function HomePage() {
  const [regions, items, collections] = await Promise.all([getAvailableRegions(), getAllTravelItems(), getCollections()]);
  const themes = getThemesWithItems(items).filter((group) => group.items.length >= 2);
  const recommendation = items.find((item) => item.id === "anmok-beach")
    || items.find((item) => item.themeSlug === "nature")
    || items[0];

  return (
    <div className="page-container home-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: canonicalUrl("/"),
        inLanguage: "ko-KR",
        description: "한국관광공사 TourAPI 정보를 바탕으로 지역과 테마별 국내 여행지와 행사를 소개합니다.",
        potentialAction: { "@type": "SearchAction", target: canonicalUrl("/search") + "?q={search_term_string}", "query-input": "required name=search_term_string" },
      }} />
      <section className="hero">
        <div className="hero-copy">
          <img className="hero-mascot" src="/mascot.svg" alt="여행 가방을 멘 마스코트 뽈뽈이" width={96} height={88} />
          <Heading level={1}>이번 주말,<br />어디로 뽈뽈 가볼까요?</Heading>
          <Text as="p" className="hero-description">지역과 관심사로 국내 여행지를 둘러보세요.</Text>
          <SearchForm
            variant="hero"
            placeholder="예: 바다 가까운 곳에서 쉬고 싶어요"
            submitLabel="여행지 둘러보기"
          />
        </div>
        {recommendation ? <FeaturedPlace item={recommendation} /> : null}
      </section>

      {collections.length ? (
        <section className="content-section">
          <SectionHeading
            title="뽈뽈이가 고른 모음"
            description="상황에 맞춰 함께 둘러보기 좋은 장소를 묶어 두었어요."
            href="/collections"
          />
          <div className="region-grid collection-grid">
            {collections.slice(0, 4).map(({ collection, items: collectionItems }, index) => (
              <CollectionCard key={collection.slug} index={index} slug={collection.slug} title={collection.title} summary={collection.summary} count={collectionItems.length} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="content-section">
        <SectionHeading
          title="지역에서 찾아보기"
          description="여행할 지역의 관광 정보를 확인해 보세요."
          href="/regions"
        />
        <div className="region-grid">
          {regions.map((region, index) => (
            <RegionCard
              key={region.slug}
              index={index}
              region={region}
              count={items.filter((item) => item.regionSlug === region.slug).length}
            />
          ))}
        </div>
      </section>

      {themes.length ? (
        <section className="content-section">
          <SectionHeading
            title="테마로 찾아보기"
            description="관광 정보에 등록된 주제로 여행지를 둘러보세요."
            href="/themes"
          />
          <div className="theme-pills">
            {themes.map(({ theme }) => (
              <ThemePill key={theme.slug} theme={theme} href={"/themes/" + theme.slug} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
