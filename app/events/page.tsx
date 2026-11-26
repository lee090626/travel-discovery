import type { Metadata } from "next";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceList, SectionHeading, ThemePill } from "@/components/travel-ui";
import { getAllTravelItems, getListedEventMonths, groupEventsByDate, monthLabel } from "@/lib/travel";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "이번 주말 축제·행사",
  "이번 주말에 열리는 전국 축제와 행사, 앞으로 한 달 안에 시작하는 행사를 날짜순으로 모았어요.",
  "/events",
);

function shortDate(dateKey: string) {
  return Number(dateKey.slice(4, 6)) + "월 " + Number(dateKey.slice(6, 8)) + "일";
}

export default async function EventsPage() {
  const items = await getAllTravelItems();
  const { saturday, sunday, weekend, nextMonth } = groupEventsByDate(items);
  const months = getListedEventMonths(items);

  return (
    <div className="page-container listing-page">
      <JsonLd data={listingJsonLd("이번 주말 축제·행사", [...weekend, ...nextMonth], [{ name: "이번 주말 행사", path: "/events" }])} />
      <Breadcrumbs items={[{ label: "이번 주말 행사" }]} />
      <header className="page-intro">
        <img className="intro-mascot" src="/mascot.svg" alt="뽈뽈이" width={160} height={130} />
        <Heading level={1}>이번 주말엔<br />어디서 축제가 열릴까요?</Heading>
        <Text as="p">한국관광공사 행사 정보를 매일 새로 받아 날짜순으로 정리해요. 일정은 바뀔 수 있으니 방문 전에 공식 안내를 확인해 주세요.</Text>
      </header>
      {months.length ? (
        <nav className="content-section" aria-label="월별 행사">
          <SectionHeading title="월별 행사 일정" />
          <div className="theme-pills">
            {months.map(({ month, items: monthItems }) => (
              <ThemePill key={month} href={"/events/" + month} label={monthLabel(month) + " · " + monthItems.length + "개"} />
            ))}
          </div>
        </nav>
      ) : null}
      <section className="content-section">
        <SectionHeading title={"이번 주말 (" + shortDate(saturday) + "–" + shortDate(sunday) + ")"} description={weekend.length + "개 행사"} />
        {weekend.length ? <PlaceList items={weekend} /> : <Text as="p">이번 주말에 열리는 행사 정보가 아직 없어요.</Text>}
      </section>
      <section className="content-section last-section">
        <SectionHeading title="한 달 안에 시작하는 행사" description={nextMonth.length + "개 행사"} />
        {nextMonth.length ? <PlaceList items={nextMonth} /> : <Text as="p">한 달 안에 시작하는 행사 정보가 아직 없어요.</Text>}
      </section>
    </div>
  );
}
