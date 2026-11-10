import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { AffiliateLink, Breadcrumbs, PlaceList, SectionHeading, ThemePill } from "@/components/travel-ui";
import { getAvailableRegions, getRegion, getRegionItems, getTheme, getThemesWithItems } from "@/lib/travel";
import { JsonLd, canonicalUrl, pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ region: string }> };

export async function generateStaticParams() {
  return (await getAvailableRegions()).map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) return pageMetadata("지역별 여행지", "지역별 국내 여행 정보를 둘러보세요.", "/regions");
  return pageMetadata(region.name + " 여행지", region.summary || region.name + "에 등록된 국내 여행지를 둘러보세요.", "/regions/" + slug);
}

export default async function RegionPage({ params }: PageProps) {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const items = await getRegionItems(slug);
  if (!items.length) notFound();

  const themeGroups = getThemesWithItems(items).filter((group) => group.items.length >= 2);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: region.name + " 여행지",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: canonicalUrl("/places/" + item.id) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "지역별", item: canonicalUrl("/regions") },
        { "@type": "ListItem", position: 2, name: region.name, item: canonicalUrl("/regions/" + slug) },
      ],
    },
  ];
  return (
    <div className="page-container listing-page">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "지역별", href: "/regions" }, { label: region.name }]} />
      <header className="page-intro region-intro">
        <Heading level={1}>{region.name}<br />여행지를 둘러봐요.</Heading>
        <Text as="p">{region.summary || region.name + " 지역의 한국관광공사 등록 여행 정보를 확인해 보세요."}</Text>
      </header>

      {themeGroups.length ? (
        <section className="content-section compact-section">
          <SectionHeading title="어떤 테마가 궁금해요?" description="정보가 준비된 주제만 보여드려요." />
          <div className="theme-pills">
            {themeGroups.map(({ theme }) => (
              <ThemePill key={theme.slug} theme={theme} href={"/regions/" + slug + "/" + theme.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="content-section last-section">
        <SectionHeading title={region.name + "에서 둘러볼 곳"} description={items.length + "곳의 출처가 있는 관광 정보를 모았어요."} />
        <PlaceList items={items} />
      </section>
      <AffiliateLink regionSlug={slug} regionName={region.name} />
    </div>
  );
}
