import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, PlaceList, RegionBanner, RegionThemeNav, SectionHeading } from "@/components/travel-ui";
import { getAvailableRegions, getRegion, getRegionItems, getRegionThemeItems, getTheme, getThemesWithItems } from "@/lib/travel";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ region: string; theme: string }> };

export async function generateStaticParams() {
  const regions = await getAvailableRegions();
  const groups = await Promise.all(regions.map(async (region) => ({
    region,
    items: await getRegionItems(region.slug),
  })));
  return groups.flatMap(({ region, items }) =>
    getThemesWithItems(items)
      .filter((group) => group.items.length >= 2)
      .map((group) => ({ region: region.slug, theme: group.theme.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: regionSlug, theme: themeSlug } = await params;
  const region = getRegion(regionSlug);
  const theme = getTheme(themeSlug);
  if (!region || !theme) return pageMetadata("지역 테마 여행", "지역과 테마에 맞는 여행 정보를 둘러보세요.", "/regions");
  return pageMetadata(
    region.name + " " + theme.name + " 여행",
    region.name + "의 " + theme.name + " 여행 정보를 모았어요. 출처가 있는 장소와 행사 정보를 확인해 보세요.",
    "/regions/" + regionSlug + "/" + themeSlug,
  );
}

export default async function RegionThemePage({ params }: PageProps) {
  const { region: regionSlug, theme: themeSlug } = await params;
  const region = getRegion(regionSlug);
  const theme = getTheme(themeSlug);
  if (!region || !theme) notFound();

  const regionItems = await getRegionItems(regionSlug);
  const items = getRegionThemeItems(regionItems, themeSlug);
  const themeGroups = getThemesWithItems(regionItems).filter((group) => group.items.length >= 2);
  if (items.length < 2) notFound();

  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[
        { label: "지역별", href: "/regions" },
        { label: region.name, href: "/regions/" + regionSlug },
        { label: theme.name },
      ]} />
      <RegionBanner
        title={region.name + " " + theme.name}
        description={theme.description + " 장소별 공식 정보도 함께 확인할 수 있어요."}
        count={items.length}
      />
      <RegionThemeNav regionSlug={regionSlug} themes={themeGroups.map((group) => group.theme)} current={themeSlug} />
      <section className="content-section last-section">
        <SectionHeading title={region.name + " " + theme.name + " 여행지"} />
        <PlaceList items={items} />
      </section>
    </div>
  );
}
