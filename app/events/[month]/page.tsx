import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceList, SectionHeading } from "@/components/travel-ui";
import { getAllTravelItems, getListedEventMonths, monthLabel, REGIONS } from "@/lib/travel";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ month: string }> };

export async function generateStaticParams() {
  return getListedEventMonths(await getAllTravelItems()).map(({ month }) => ({ month }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { month } = await params;
  const label = monthLabel(month);
  return pageMetadata(label + " 전국 축제·행사 일정", label + "에 열리는 전국 축제와 행사를 지역별로 날짜순 정리했어요.", "/events/" + month);
}

export default async function MonthEventsPage({ params }: PageProps) {
  const { month } = await params;
  const events = getListedEventMonths(await getAllTravelItems()).find((group) => group.month === month)?.items;
  if (!events) notFound();
  const label = monthLabel(month);
  const groups = REGIONS.map((region) => ({ region, items: events.filter((item) => item.regionSlug === region.slug) }))
    .filter((group) => group.items.length > 0)
    .sort((a, b) => b.items.length - a.items.length);

  return (
    <div className="page-container listing-page">
      <JsonLd data={listingJsonLd(label + " 축제·행사", events, [{ name: "이번 주말 행사", path: "/events" }, { name: label, path: "/events/" + month }])} />
      <Breadcrumbs items={[{ label: "이번 주말 행사", href: "/events" }, { label }]} />
      <header className="page-intro">
        <img className="intro-mascot" src="/mascot.svg" alt="뽈뽈이" width={160} height={130} />
        <Heading level={1}>{label}에 열리는<br />축제·행사를 모았어요.</Heading>
        <Text as="p">{groups.length}개 지역, {events.length}개 행사예요. 한국관광공사 정보를 매일 새로 받아요. 일정은 바뀔 수 있으니 방문 전에 공식 안내를 확인해 주세요.</Text>
      </header>
      {groups.map(({ region, items }, index) => (
        <section key={region.slug} className={"content-section" + (index === groups.length - 1 ? " last-section" : "")}>
          <SectionHeading title={region.name + " " + label + " 행사"} description={items.length + "개 행사"} href={"/regions/" + region.slug} linkLabel={region.name + " 여행지 보기"} />
          <PlaceList items={items} />
        </section>
      ))}
    </div>
  );
}
