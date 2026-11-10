import snapshot from "@/data/kto-snapshot.json";

export type ThemeSlug = "nature" | "culture" | "outdoor" | "courses" | "food" | "events";

export type Region = {
  slug: string;
  name: string;
  areaCode: string;
  summary?: string;
};

export type Theme = {
  slug: ThemeSlug;
  name: string;
  description: string;
  icon: "waves" | "landmark" | "walk" | "route" | "food" | "calendar";
};

export type TravelPhoto = {
  url: string;
  license: "Type1" | "Type3";
  name?: string;
};

export type TravelItem = {
  id: string;
  title: string;
  regionSlug: string;
  regionName: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  imageLicense?: TravelPhoto["license"];
  photos?: TravelPhoto[];
  telephone?: string;
  homepageUrl?: string;
  visitInfo?: { label: string; value: string }[];
  themeSlug: ThemeSlug;
  contentTypeId: string;
  eventStartDate?: string;
  eventEndDate?: string;
  sourceName: string;
  sourceUrl: string;
  updatedAt?: string;
};

export const REGIONS: Region[] = [
  { slug: "seoul", name: "서울", areaCode: "1" },
  { slug: "incheon", name: "인천", areaCode: "2" },
  { slug: "daejeon", name: "대전", areaCode: "3" },
  { slug: "daegu", name: "대구", areaCode: "4" },
  { slug: "gwangju", name: "광주", areaCode: "5" },
  { slug: "busan", name: "부산", areaCode: "6", summary: "해변과 골목, 도시의 풍경을 함께 둘러볼 수 있어요." },
  { slug: "ulsan", name: "울산", areaCode: "7" },
  { slug: "sejong", name: "세종", areaCode: "8" },
  { slug: "gyeonggi", name: "경기도", areaCode: "31" },
  { slug: "gangwon", name: "강원특별자치도", areaCode: "32", summary: "동해 바다와 호수, 역사 공간을 따라 여행을 계획해 보세요." },
  { slug: "chungbuk", name: "충청북도", areaCode: "33" },
  { slug: "chungnam", name: "충청남도", areaCode: "34" },
  { slug: "gyeongbuk", name: "경상북도", areaCode: "35" },
  { slug: "gyeongnam", name: "경상남도", areaCode: "36" },
  { slug: "jeonbuk", name: "전북특별자치도", areaCode: "37", summary: "한옥마을과 전통문화가 있는 전주를 중심으로 둘러보세요." },
  { slug: "jeonnam", name: "전라남도", areaCode: "38" },
  { slug: "jeju", name: "제주특별자치도", areaCode: "39" },
];

export const THEMES: Theme[] = [
  { slug: "nature", name: "자연과 바다", description: "바다와 호수, 숲처럼 자연 가까이에서 쉬어갈 수 있는 여행지를 모았어요.", icon: "waves" },
  { slug: "culture", name: "역사와 문화", description: "지역의 유산과 생활문화가 담긴 공간을 살펴보고, 주변 장소를 함께 이어 보세요.", icon: "landmark" },
  { slug: "outdoor", name: "야외 활동", description: "야외에서 몸을 움직이며 즐길 수 있는 관광 정보를 모았어요.", icon: "walk" },
  { slug: "courses", name: "여행 코스", description: "한국관광공사에 등록된 여행 코스 정보를 확인해 보세요.", icon: "route" },
  { slug: "food", name: "음식", description: "지역에 등록된 음식점 정보를 살펴보고 방문 전 영업 정보를 확인해 보세요.", icon: "food" },
  { slug: "events", name: "축제와 행사", description: "개최 중이거나 앞으로 열릴 예정인 행사 정보를 날짜와 함께 확인해 보세요.", icon: "calendar" },
];

const KTO_API_URL = "https://www.data.go.kr/data/15101578/openapi.do";
const SOURCE_NAME = "한국관광공사 대한민국 구석구석";
const API_SOURCE_NAME = "한국관광공사 TourAPI";

export const SEED_ITEMS: TravelItem[] = [
  {
    id: "haeundae-beach",
    title: "해운대해수욕장",
    regionSlug: "busan",
    regionName: "부산",
    address: "부산광역시 해운대구",
    description: "부산을 대표하는 해수욕장으로 소개돼요. 바다를 중심에 두고 해운대 일대를 둘러보고 싶은 날에 잘 어울립니다.",
    themeSlug: "nature",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=36f54304-e9a8-4615-9226-eb749bf6ce75",
    updatedAt: "2026-11-08",
  },
  {
    id: "gwangalli-beach",
    title: "광안리해수욕장",
    regionSlug: "busan",
    regionName: "부산",
    address: "부산광역시 수영구",
    description: "푸른 바다와 백사장이 어우러진 부산의 대표 해변이에요. 해변 풍경을 중심으로 일정을 잡아보세요.",
    themeSlug: "nature",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?big_area=6&big_category=A01&cotid=98763dd6-119d-4e32-910e-a40652334bda&mid_category=A0101",
    updatedAt: "2026-11-08",
  },
  {
    id: "gamcheon-culture-village",
    title: "감천문화마을",
    regionSlug: "busan",
    regionName: "부산",
    address: "부산광역시 사하구",
    description: "산비탈을 따라 이어지는 집과 골목, 문화예술 공간을 함께 둘러볼 수 있어요.",
    themeSlug: "culture",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=bfafd82a-6e0a-4455-bfef-10e478de5ca4",
    updatedAt: "2026-11-08",
  },
  {
    id: "anmok-beach",
    title: "안목해변",
    regionSlug: "gangwon",
    regionName: "강원특별자치도",
    address: "강원특별자치도 강릉시",
    description: "동해 바다와 커피거리가 함께 소개되는 강릉 해변이에요. 해변을 걷고 주변에서 쉬어가는 코스로 살펴보기 좋습니다.",
    themeSlug: "nature",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=f9d3fd78-55bd-4d5c-90fe-25af7ffa76a0",
    updatedAt: "2026-11-08",
  },
  {
    id: "gyeongpo-beach",
    title: "경포해수욕장",
    regionSlug: "gangwon",
    regionName: "강원특별자치도",
    address: "강원특별자치도 강릉시",
    description: "경포호와 바다 사이에 자리한 강릉의 해변이에요. 호수와 해안 풍경을 함께 살펴볼 수 있습니다.",
    themeSlug: "nature",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?big_area=32&big_category=A01&cotid=60ad68a9-2222-4558-96d7-7f0b44736aef&mid_category=A0101",
    updatedAt: "2026-11-08",
  },
  {
    id: "gyeongpodae",
    title: "강릉 경포대",
    regionSlug: "gangwon",
    regionName: "강원특별자치도",
    address: "강원특별자치도 강릉시",
    description: "강릉을 대표하는 명승지예요. 경포호 주변의 역사 공간을 함께 둘러보는 일정으로 이어갈 수 있습니다.",
    themeSlug: "culture",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=babcea7b-a8e6-4a30-9e33-f783ad33fe79",
    updatedAt: "2026-11-08",
  },
  {
    id: "ojukheon",
    title: "강릉 오죽헌",
    regionSlug: "gangwon",
    regionName: "강원특별자치도",
    address: "강원특별자치도 강릉시",
    description: "율곡 이이와 관련된 강릉의 유적지예요. 문성사와 율곡기념관 등 경내 공간을 함께 살펴볼 수 있습니다.",
    themeSlug: "culture",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=679100b3-4c51-452c-8ca1-ee196477cce1",
    updatedAt: "2026-11-08",
  },
  {
    id: "jeonju-hanok-village",
    title: "전주 한옥마을",
    regionSlug: "jeonbuk",
    regionName: "전북특별자치도",
    address: "전북특별자치도 전주시",
    description: "풍남동 일대에 700여 채의 한옥이 모여 있는 전통 한옥촌으로 소개돼요. 골목과 한옥의 분위기를 천천히 둘러보세요.",
    themeSlug: "culture",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=66dba60b-a623-4753-a3b4-76a62fcbbe05",
    updatedAt: "2026-11-08",
  },
  {
    id: "gyeonggijeon",
    title: "전주 경기전",
    regionSlug: "jeonbuk",
    regionName: "전북특별자치도",
    address: "전북특별자치도 전주시",
    description: "조선 태조 이성계의 어진을 봉안한 전각이에요. 전주 도심의 역사 공간을 살펴보고 싶을 때 함께 둘러볼 수 있습니다.",
    themeSlug: "culture",
    contentTypeId: "12",
    sourceName: SOURCE_NAME,
    sourceUrl: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=9894d02b-5f1e-411a-b700-762cc2d0ab2b",
    updatedAt: "2026-11-08",
  },
];

type KtoRecord = Record<string, unknown>;

function value(record: KtoRecord, key: string) {
  const item = record[key];
  return typeof item === "string" || typeof item === "number" ? String(item).trim() : "";
}

function plainText(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function ktoImageUrl(record: KtoRecord, key = "firstimage") {
  const raw = key === "firstimage"
    ? value(record, "firstimage") || value(record, "firstimage2")
    : value(record, key);
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    if (url.hostname !== "tong.visitkorea.or.kr" || !["http:", "https:"].includes(url.protocol)) return undefined;
    url.protocol = "https:";
    return url.toString();
  } catch {
    return undefined;
  }
}

function ktoPhoto(record: KtoRecord, key = "originimgurl"): TravelPhoto | undefined {
  const license = value(record, "cpyrhtDivCd");
  const url = ktoImageUrl(record, key);
  if (!url || (license !== "Type1" && license !== "Type3")) return undefined;
  return { url, license, name: plainText(value(record, "imgname")) || undefined };
}

function homepageUrl(record: KtoRecord) {
  const raw = value(record, "homepage");
  const href = raw.match(/href=["']([^"']+)["']/i)?.[1] || plainText(raw);
  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function themeForApi(contentTypeId: string, category: string): ThemeSlug | null {
  if (contentTypeId === "15") return "events";
  if (contentTypeId === "25") return "courses";
  if (contentTypeId === "39") return "food";
  if (contentTypeId === "14" || category === "A02") return "culture";
  if (category === "A03") return "outdoor";
  if (contentTypeId === "12" || category === "A01") return "nature";
  return null;
}

function mapApiRecord(record: KtoRecord, region: Region): TravelItem | null {
  const id = value(record, "contentid");
  const title = plainText(value(record, "title"));
  const contentTypeId = value(record, "contenttypeid");
  const themeSlug = themeForApi(contentTypeId, value(record, "cat1"));
  if (!id || !title || !themeSlug) return null;

  const start = value(record, "eventstartdate") || value(record, "eventStartDate");
  const end = value(record, "eventenddate") || value(record, "eventEndDate");
  const photo = ktoPhoto(record, "firstimage");
  return {
    id,
    title,
    regionSlug: region.slug,
    regionName: region.name,
    address: plainText(value(record, "addr1")),
    description: plainText(value(record, "overview")) || undefined,
    imageUrl: photo?.url,
    imageLicense: photo?.license,
    telephone: plainText(value(record, "tel")) || undefined,
    homepageUrl: homepageUrl(record),
    themeSlug,
    contentTypeId,
    eventStartDate: start,
    eventEndDate: end,
    sourceName: API_SOURCE_NAME,
    sourceUrl: KTO_API_URL,
    updatedAt: value(record, "modifiedtime"),
  };
}

function koreaDateKey(offsetDays = 0) {
  const timestamp = Date.now() + (offsetDays * 86400000) + (9 * 3600000);
  return new Date(timestamp).toISOString().slice(0, 10).replace(/-/g, "");
}

type KtoSnapshot = {
  regions: Record<string, KtoRecord[]>;
  details: Record<string, KtoRecord>;
};

// Built by `npm run data:fetch`; pages only read this file, never the live API.
function getKtoRegionItems(region: Region) {
  const { regions, details } = snapshot as KtoSnapshot;
  const today = koreaDateKey();
  return (regions[region.areaCode] || [])
    .filter((record) => {
      if (value(record, "contenttypeid") !== "15") return true;
      const end = value(record, "eventenddate") || value(record, "eventEndDate");
      return end.length === 8 && end >= today;
    })
    .map((record) => mapApiRecord({ ...details[value(record, "contentid")], ...record }, region))
    // Skip places without a description: the list API has none, and thin pages are not worth indexing.
    .filter((item): item is TravelItem => item !== null && Boolean(item.description));
}

export function getRegion(slug: string) {
  return REGIONS.find((region) => region.slug === slug);
}

export function getTheme(slug: string) {
  return THEMES.find((theme) => theme.slug === slug);
}

export async function getRegionItems(regionSlug: string) {
  const region = getRegion(regionSlug);
  if (!region) return [];

  const items = getKtoRegionItems(region);
  if (items.length) return items;

  return SEED_ITEMS.filter((item) => item.regionSlug === regionSlug);
}

export async function getAvailableRegions() {
  const groups = await Promise.all(REGIONS.map(async (region) => ({
    region,
    items: await getRegionItems(region.slug),
  })));
  return groups.filter((group) => group.items.length > 0).map((group) => group.region);
}

export async function getAllTravelItems() {
  const groups = await Promise.all(REGIONS.map((region) => getRegionItems(region.slug)));
  return groups.flat();
}

export function getRegionThemeItems(items: TravelItem[], themeSlug: string) {
  return items.filter((item) => item.themeSlug === themeSlug);
}

export function getThemesWithItems(items: TravelItem[]) {
  return THEMES.map((theme) => ({
    theme,
    items: items.filter((item) => item.themeSlug === theme.slug),
  })).filter((group) => group.items.length > 0);
}

function cleanDate(valueToFormat?: string) {
  const digits = (valueToFormat || "").replace(/[^0-9]/g, "");
  if (digits.length !== 8) return "";
  return digits.slice(0, 4) + "." + digits.slice(4, 6) + "." + digits.slice(6, 8);
}

export function eventPeriod(item: TravelItem) {
  const start = cleanDate(item.eventStartDate);
  const end = cleanDate(item.eventEndDate);
  if (!start || !end) return "";
  return start + " — " + end;
}

export async function getTravelItem(id: string): Promise<TravelItem | undefined> {
  return (await getAllTravelItems()).find((item) => item.id === id);
}

