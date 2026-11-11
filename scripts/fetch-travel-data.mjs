// Collects TourAPI data into data/kto-snapshot.json so builds never call the API.
//
//   npm run data:fetch            (reads KTO_SERVICE_KEY from .env.local)
//   DETAIL_LIMIT=500 npm run data:fetch
//
// List data is refreshed on every run. Detail data (the description the list API
// lacks) is fetched incrementally, at most DETAIL_LIMIT places per run, so the
// daily API quota is never exhausted. The file is only written if every list
// request succeeded.
import { readFile, writeFile } from "node:fs/promises";

const BASE_URL = "https://apis.data.go.kr/B551011/KorService2";
const SNAPSHOT_FILE = new URL("../data/kto-snapshot.json", import.meta.url);
// Must match the areaCode values of REGIONS in lib/travel.ts.
const AREA_CODES = ["1", "2", "3", "4", "5", "6", "7", "8", "31", "32", "33", "34", "35", "36", "37", "38", "39"];
const LIST_CONTENT_TYPES = ["12", "14", "25", "39"];
const LIST_FIELDS = ["addr1", "areacode", "cat1", "contentid", "contenttypeid", "cpyrhtDivCd", "eventenddate", "eventstartdate", "firstimage", "firstimage2", "modifiedtime", "tel", "title"];
const DETAIL_FIELDS = ["homepage", "overview", "tel"];
const DETAIL_LIMIT = Number(process.env.DETAIL_LIMIT || 900);
const CONCURRENCY = 3;
const ATTEMPTS = 3;

const serviceKey = process.env.KTO_SERVICE_KEY;
if (!serviceKey) {
  console.error("KTO_SERVICE_KEY is not set.");
  process.exit(1);
}

function koreaDateKey(offsetDays = 0) {
  const timestamp = Date.now() + offsetDays * 86400000 + 9 * 3600000;
  return new Date(timestamp).toISOString().slice(0, 10).replace(/-/g, "");
}

function pick(record, fields) {
  return Object.fromEntries(fields.filter((key) => record[key] !== undefined && record[key] !== "").map((key) => [key, record[key]]));
}

async function request(endpoint, params) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const url = new URL(`${BASE_URL}/${endpoint}`);
      url.searchParams.set("serviceKey", serviceKey);
      url.searchParams.set("MobileOS", "ETC");
      url.searchParams.set("MobileApp", "TravelDiscovery");
      url.searchParams.set("_type", "json");
      for (const [key, item] of Object.entries(params)) url.searchParams.set(key, item);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const code = payload?.response?.header?.resultCode ?? payload?.resultCode;
      if (code !== "0000") throw new Error(`resultCode ${code}`);
      const item = payload?.response?.body?.items?.item;
      return Array.isArray(item) ? item : item && typeof item === "object" ? [item] : [];
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw new Error(`${endpoint} ${JSON.stringify(params)} failed: ${lastError.message}`);
}

async function mapLimit(items, task) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index]);
    }
  }));
  return results;
}

async function fetchRegion(areaCode) {
  const lists = await Promise.all(LIST_CONTENT_TYPES.map((contentTypeId) =>
    request("areaBasedList2", { areaCode, contentTypeId, numOfRows: "40", pageNo: "1" })));
  const festivals = (await request("searchFestival2", {
    areaCode,
    eventStartDate: koreaDateKey(-30),
    eventEndDate: koreaDateKey(180),
    numOfRows: "40",
    pageNo: "1",
  })).map((record) => ({ ...record, contenttypeid: "15" }));
  const seen = new Set();
  return [...lists.flat(), ...festivals]
    .filter((record) => record.contentid && !seen.has(record.contentid) && seen.add(record.contentid))
    .map((record) => pick(record, LIST_FIELDS))
    .sort((a, b) => String(a.contentid).localeCompare(String(b.contentid)));
}

const previous = JSON.parse(await readFile(SNAPSHOT_FILE, "utf8"));

// 1. Lists: any failure aborts the run before anything is written.
const regionRecords = await mapLimit(AREA_CODES, fetchRegion);
// The list API returns a shifting window of places, so keep places from earlier runs
// (except events, which expire) instead of letting them drop off the site.
const regions = Object.fromEntries(AREA_CODES.map((code, index) => {
  const fresh = regionRecords[index];
  const freshIds = new Set(fresh.map((record) => String(record.contentid)));
  const kept = (previous.regions?.[code] || []).filter((record) => record.contenttypeid !== "15" && !freshIds.has(String(record.contentid)));
  return [code, [...fresh, ...kept].sort((a, b) => String(a.contentid).localeCompare(String(b.contentid)))];
}));
const records = Object.values(regions).flat();
console.log(`lists: ${records.length} places in ${AREA_CODES.length} regions`);

// 2. Details: only new or modified places, capped per run. Stale entries are dropped.
const currentIds = new Set(records.map((record) => String(record.contentid)));
const details = Object.fromEntries(Object.entries(previous.details || {}).filter(([id]) => currentIds.has(id)));
const pending = records.filter((record) => details[record.contentid]?.modifiedtime !== record.modifiedtime);
const batch = pending.slice(0, DETAIL_LIMIT);
let fetched = 0;
let failed = 0;
await mapLimit(batch, async (record) => {
  try {
    const [common] = await request("detailCommon2", { contentId: record.contentid });
    if (!common) throw new Error("empty detail");
    details[record.contentid] = { ...pick(common, DETAIL_FIELDS), modifiedtime: record.modifiedtime };
    fetched++;
  } catch (error) {
    failed++;
    console.warn(`detail ${record.contentid}: ${error.message}`);
  }
});
console.log(`details: fetched ${fetched}, failed ${failed}, still pending ${pending.length - fetched}`);
if (batch.length && !fetched) {
  console.error("No detail request succeeded (quota or key problem?); snapshot not written.");
  process.exit(1);
}

const sortedDetails = Object.fromEntries(Object.entries(details).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(SNAPSHOT_FILE, JSON.stringify({ regions, details: sortedDetails }, null, 1) + "\n");
console.log("wrote data/kto-snapshot.json");
