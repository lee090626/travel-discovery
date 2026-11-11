import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateLink, Breadcrumbs, PlaceList, RegionBanner, RegionThemeNav, SectionHeading } from "@/components/travel-ui";
import { getAvailableRegions, getRegion, getRegionItems, getThemesWithItems } from "@/lib/travel";
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
      <RegionBanner
        title={region.name}
        description={region.summary || region.name + " 지역의 한국관광공사 등록 여행 정보를 확인해 보세요."}
        count={items.length}
      />
      <RegionThemeNav regionSlug={slug} themes={themeGroups.map((group) => group.theme)} />

      <section className="content-section last-section">
        <SectionHeading title={region.name + " 여행지"} />
        <PlaceList items={items} />
      </section>
      <AffiliateLink regionSlug={slug} regionName={region.name} />
    </div>
  );
}
