import { describe, expect, it } from "vitest";
import { getAllTravelItems, groupEventsByDate, type TravelItem } from "@/lib/travel";

const event = (id: string, start: string, end: string): TravelItem => ({
  id, title: id, regionSlug: "seoul", regionName: "서울", themeSlug: "events", contentTypeId: "15",
  eventStartDate: start, eventEndDate: end, sourceName: "test", sourceUrl: "https://example.com",
});

describe("groupEventsByDate", () => {
  const items = [
    event("weekend", "20261128", "20261128"),
    event("spans", "20261101", "20261231"),
    event("later", "20261210", "20261212"),
    event("ended", "20261101", "20261125"),
    event("farAway", "20270301", "20270302"),
  ];

  it("splits weekday builds into the coming weekend and the next 30 days", () => {
    const { saturday, sunday, weekend, nextMonth } = groupEventsByDate(items, "20261126");
    expect([saturday, sunday]).toEqual(["20261128", "20261129"]);
    expect(weekend.map((item) => item.id)).toEqual(["spans", "weekend"]);
    expect(nextMonth.map((item) => item.id)).toEqual(["later"]);
  });

  it("uses the current weekend when built on Sunday", () => {
    expect(groupEventsByDate(items, "20261129").saturday).toBe("20261128");
  });
});

it("loads snapshot places with descriptions", async () => {
  const items = await getAllTravelItems();
  expect(items.length).toBeGreaterThan(0);
  expect(items.every((item) => item.description)).toBe(true);
});
