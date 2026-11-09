import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceList, SectionHeading } from "@/components/travel-ui";
import { getAllTravelItems, getTheme, getThemesWithItems } from "@/lib/travel";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ theme: string }> };

export async function generateStaticParams() {
  const groups = getThemesWithItems(await getAllTravelItems());
  return groups.filter((group) => group.items.length >= 2).map((group) => ({ theme: group.theme.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { theme: slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return pageMetadata("테마별 여행지", "관심 있는 주제로 국내 여행지를 찾아보세요.", "/themes");
  return pageMetadata(theme.name + " 여행지", theme.description, "/themes/" + slug);
}

export default async function ThemePage({ params }: PageProps) {
  const { theme: slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();
  const group = getThemesWithItems(await getAllTravelItems()).find((item) => item.theme.slug === slug);
  if (!group || group.items.length < 2) notFound();

  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[{ label: "테마별", href: "/themes" }, { label: theme.name }]} />
      <header className="page-intro">
        <Heading level={1}>{theme.name}<br />여행지를 찾아봐요.</Heading>
        <Text as="p">{theme.description}</Text>
      </header>
      <section className="content-section last-section">
        <SectionHeading title={theme.name + " 여행지"} description={group.items.length + "곳 · " + new Set(group.items.map((item) => item.regionSlug)).size + "개 지역"} />
        <PlaceList items={group.items} />
      </section>
    </div>
  );
}
