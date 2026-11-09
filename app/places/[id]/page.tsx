import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { AffiliateLink, Breadcrumbs, PlaceGallery, SourceNote } from "@/components/travel-ui";
import { Icon } from "@/components/icons";
import { eventPeriod, getAllTravelItems, getTheme, getTravelItem } from "@/lib/travel";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return (await getAllTravelItems()).map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getTravelItem(id);
  if (!item) return pageMetadata("여행지 정보", "출처가 있는 국내 여행 정보를 확인해 보세요.", "/places");
  const description = item.description || item.address || item.title + "의 관광 정보를 확인해 보세요.";
  return pageMetadata(item.title, description, "/places/" + id);
}

export default async function PlacePage({ params }: PageProps) {
  const { id } = await params;
  const item = await getTravelItem(id);
  if (!item) notFound();

  const theme = getTheme(item.themeSlug);
  const period = eventPeriod(item);
  return (
    <div className="page-container detail-page">
      <Breadcrumbs items={[
        { label: "지역별", href: "/regions" },
        ...(item.regionSlug ? [{ label: item.regionName, href: "/regions/" + item.regionSlug }] : []),
        { label: item.title },
      ]} />
      <article>
        <header className="detail-heading">
          <div className={"detail-symbol theme-" + item.themeSlug}><Icon name={theme?.icon || "compass"} size={31} /></div>
          <Text as="p" className="detail-location">{item.regionName}</Text>
          <Heading level={1}>{item.title}</Heading>
          <div className="detail-tags">
            {theme ? <span>{theme.name}</span> : null}
            {period ? <span>{period}</span> : null}
          </div>
        </header>
        <PlaceGallery item={item} />
        <div className="detail-body">
          {item.description ? <Text as="p" className="detail-description">{item.description}</Text> : null}
          {item.address || item.telephone || item.homepageUrl || item.visitInfo?.length ? (
            <section className="place-facts" aria-labelledby="place-facts-title">
              <Heading level={2} id="place-facts-title">방문 정보</Heading>
              <dl>
                {item.address ? <div><dt>주소</dt><dd>{item.address}</dd></div> : null}
                {item.telephone ? <div><dt>문의</dt><dd>{item.telephone}</dd></div> : null}
                {item.homepageUrl ? (
                  <div>
                    <dt>공식 홈페이지</dt>
                    <dd><Link href={item.homepageUrl} target="_blank" rel="noopener noreferrer" isExternalLink>홈페이지 열기</Link></dd>
                  </div>
                ) : null}
                {item.visitInfo?.map((fact) => (
                  <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                ))}
              </dl>
            </section>
          ) : null}
          <div className="planning-note">
            <span className="planning-note-icon"><Icon name="landmark" size={18} /></span>
            <Text as="p">방문 시간과 이용 정보는 바뀔 수 있어요. 출발 전에 원문 안내를 확인해 주세요.</Text>
          </div>
          <SourceNote item={item} />
          <AffiliateLink />
        </div>
      </article>
    </div>
  );
}
