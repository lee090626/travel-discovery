import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { Icon } from "@/components/icons";
import { SearchForm } from "@/components/astryx-search-form";
import { FeaturedPlace, RegionCard, SectionHeading } from "@/components/travel-ui";
import { getAllTravelItems, getAvailableRegions, getThemesWithItems } from "@/lib/travel";

export default async function HomePage() {
  const [regions, items] = await Promise.all([getAvailableRegions(), getAllTravelItems()]);
  const themes = getThemesWithItems(items).filter((group) => group.items.length >= 2);
  const recommendation = items.find((item) => item.id === "anmok-beach")
    || items.find((item) => item.themeSlug === "nature")
    || items[0];

  return (
    <div className="page-container home-page">
      <section className="hero">
        <div className="hero-copy">
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

      <section className="content-section">
        <SectionHeading
          title="지역에서 찾아보기"
          description="여행할 지역의 관광 정보를 확인해 보세요."
          href="/regions"
        />
        <div className="region-grid">
          {regions.map((region) => (
            <RegionCard
              key={region.slug}
              region={region}
              count={items.filter((item) => item.regionSlug === region.slug).length}
            />
          ))}
        </div>
      </section>

      {themes.length ? (
        <section className="content-section">
          <SectionHeading
            title="관심 있는 테마"
            description="관광 정보에 등록된 주제로 여행지를 둘러보세요."
            href="/themes"
          />
          <div className="theme-grid" role="list">
            {themes.map(({ theme, items: themeItems }) => (
              <Link className={"theme-row theme-" + theme.slug} key={theme.slug} href={"/themes/" + theme.slug} role="listitem">
                <Icon name={theme.icon} size={20} />
                <strong>{theme.name}</strong>
                <span>{themeItems.length}곳</span>
                <Icon name="arrow" size={17} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
