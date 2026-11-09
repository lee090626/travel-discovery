import type { Metadata } from "next";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, SectionHeading, ThemeCard } from "@/components/travel-ui";
import { getAllTravelItems, getThemesWithItems } from "@/lib/travel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "테마별 여행지",
  "자연과 바다, 역사와 문화 등 관심 있는 테마로 국내 여행지를 찾아보세요.",
  "/themes",
);

export default async function ThemesPage() {
  const items = await getAllTravelItems();
  const themes = getThemesWithItems(items).filter((group) => group.items.length >= 2);
  return (
    <div className="page-container listing-page">
      <Breadcrumbs items={[{ label: "테마별" }]} />
      <header className="page-intro">
        <Heading level={1}>지금 끌리는<br />테마부터 찾아봐요.</Heading>
        <Text as="p">한국관광공사 관광 정보의 분류를 바탕으로, 실제 장소가 있는 테마만 열어 두었어요.</Text>
      </header>
      <section className="content-section last-section">
        <SectionHeading title="여행 테마" description={themes.length + "개 테마에서 장소를 살펴볼 수 있어요."} />
        <div className="theme-grid theme-grid-large">
          {themes.map(({ theme, items: themeItems }) => (
            <ThemeCard
              key={theme.slug}
              theme={theme}
              count={themeItems.length}
              regionCount={new Set(themeItems.map((item) => item.regionSlug)).size}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
