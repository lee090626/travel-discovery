import { getAllTravelItems, type TravelItem } from "@/lib/travel";

// 뽈뽈이 직접 고른 여행지 모음. 장소 id는 TourAPI contentid다.
// 스냅샷이 갱신되며 빠진 장소는 자동으로 제외되고, 3곳 미만이면 모음을 숨긴다.
export type Collection = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  tip: string;
  itemIds: string[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "seoul-rainy-day",
    title: "비 오는 날 서울 실내 나들이",
    summary: "우산 접고 들어가 한나절 보내기 좋은 서울의 박물관과 전시 공간이에요.",
    intro: "비가 오면 여행 계획이 통째로 흔들리죠. 그럴 때를 위해 실내에서 오래 머물 수 있는 서울의 박물관, 미술관, 전시 공간을 골라 두었어요. 대부분 지하철로 갈 수 있어 비 오는 날 이동도 부담이 적어요.",
    tip: "박물관과 미술관은 월요일에 쉬는 곳이 많아요. 출발 전에 휴관일과 관람 시간을 꼭 확인해 주세요.",
    itemIds: ["1934593", "129839", "130431", "2453996", "1799798", "3085292", "2476731", "2372228", "2765202"],
  },
  {
    slug: "seoul-libraries",
    title: "책 읽으러 가고 싶은 서울 도서관",
    summary: "공간 자체가 여행지가 되는, 분위기 좋은 서울 도서관 모음이에요.",
    intro: "조용히 책 한 권 읽는 것도 훌륭한 여행이에요. 오래된 건물을 그대로 살린 곳, 숲과 산 가까이 있는 곳처럼 머무는 시간 자체가 즐거운 서울의 도서관을 모았어요.",
    tip: "도서관은 열람실 이용 규칙과 휴관일이 저마다 달라요. 사진 촬영이 가능한지도 미리 살펴 주세요.",
    itemIds: ["1019294", "2692866", "3456336", "3451241", "130352", "3441464"],
  },
  {
    slug: "ganghwa-history-walk",
    title: "강화도 역사 산책",
    summary: "돈대와 산성을 따라 강화도의 역사를 걸어서 만나 보는 코스예요.",
    intro: "강화도는 섬 곳곳에 성곽과 돈대가 남아 있어 걷기만 해도 역사 공부가 되는 곳이에요. 서울에서 당일치기로 다녀오기 좋은 거리라 주말 나들이로도 알맞아요.",
    tip: "장소 사이 거리가 꽤 있어서 자동차나 렌터카로 이동하는 편이 편해요. 걷는 구간이 많으니 편한 신발을 챙겨 주세요.",
    itemIds: ["1254680", "125564", "127667", "2765301", "128820", "129291", "2936862"],
  },
  {
    slug: "daegu-modern-alleys",
    title: "대구 근대골목 한나절",
    summary: "대구 도심의 오래된 골목과 근대 건축을 따라 걷는 반나절 코스예요.",
    intro: "대구 중구 일대에는 근대 시기의 건물과 골목이 모여 있어서, 걸어서 둘러보기 좋아요. 골목 사이사이 공원과 문화거리도 함께 이어 보세요.",
    tip: "대부분 걸어서 이동할 수 있는 거리예요. 여름에는 한낮을 피해 오전이나 해 질 무렵에 걷는 걸 추천해요.",
    itemIds: ["2042995", "2366217", "126133", "1935606", "2746368", "128119", "126802"],
  },
  {
    slug: "city-forest-walks",
    title: "도심 속 숲과 공원 산책",
    summary: "멀리 가지 않아도 초록을 만날 수 있는 서울·대전·대구의 숲과 공원이에요.",
    intro: "큰맘 먹고 떠나지 않아도 도시 안에서 숲길을 걸을 수 있어요. 서울, 대전, 대구에서 가볍게 산책하기 좋은 숲과 공원, 습지를 모았어요.",
    tip: "산림욕장과 습지는 벌레가 많을 수 있어요. 여름에는 긴 소매와 벌레 기피제를 챙기면 좋아요.",
    itemIds: ["822384", "1602451", "3447859", "1603336", "1125480", "2742424", "2540131", "1646676"],
  },
];

export async function getCollections() {
  const all = await getAllTravelItems();
  const byId = new Map(all.map((item) => [item.id, item]));
  return COLLECTIONS.map((collection) => ({
    collection,
    items: collection.itemIds.map((id) => byId.get(id)).filter((item): item is TravelItem => Boolean(item)),
  })).filter((group) => group.items.length >= 3);
}

export async function getCollection(slug: string) {
  return (await getCollections()).find((group) => group.collection.slug === slug);
}
