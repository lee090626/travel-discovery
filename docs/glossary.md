# Glossary

## 장소 (place)

한국관광공사 TourAPI의 관광지·문화시설·여행코스·음식점·행사 하나. `contentid`가 장소 id이고 페이지 주소는 `/places/{id}`이다. 코드에서는 `TravelItem`이다.

## 스냅샷 (snapshot)

`data/kto-snapshot.json`. 빌드는 TourAPI를 직접 부르지 않고 이 파일만 읽는다. `scripts/fetch-travel-data.mjs`가 매일 03:00 KST(GitHub Actions)에 갱신한다.

- `regions`: 지역 코드별 목록 레코드. 목록 API 응답이라 설명(overview)이 없다.
- `details`: 장소 id별 상세 레코드(overview, homepage, tel).

## 장소 생명주기

장소의 상태는 어디에도 필드로 저장되지 않는다. 스냅샷의 내용과 빌드 시점의 날짜로 정해진다.

```
목록에 등장 ──▶ 상세 대기 ──▶ 상세 수집됨 ─┬─ 설명 있음 ──▶ 공개
                  ▲                        └─ 설명 없음 ──▶ 숨김
                  └── modifiedtime이 바뀌면 다시 대기
```

| 상태 | 조건 | 결과 |
|---|---|---|
| 상세 대기 | `details`에 없거나 `modifiedtime`이 목록과 다름 | 한 번 실행에 최대 `DETAIL_LIMIT`(기본 900)곳만 수집된다. 이미 받아 둔 상세가 있으면 갱신 전까지 그 내용으로 공개를 유지한다. |
| 공개 | 상세에 설명이 있고 테마를 판정할 수 있음 | 페이지와 사이트맵에 포함된다. |
| 숨김 | 설명이 없음 | 페이지를 만들지 않는다(얇은 페이지는 색인 가치가 없어서). |
| 목록에서 빠짐 | 목록 API 응답에 없음 | 행사가 아닌 장소는 이전 스냅샷에서 유지한다. 목록 API가 매번 다른 범위를 돌려주기 때문이다. 행사는 유지하지 않는다. |
| 행사 종료 | 행사(`contenttypeid` 15)이고 종료일이 빌드일 이전 | 빌드에서 제외되어 404가 된다. 그래서 데이터가 그대로여도 매일 재배포한다. |

행사는 `searchFestival2`로 전국을 한 번에 받는다. 이 API는 `areaCode` 필터에 0건을 돌려주고 `areacode`도 비워 보내므로, 법정동 시도 코드 `lDongRegnCd`를 지역 코드로 바꿔 지역에 넣는다(`LDONG_TO_AREA`, `scripts/fetch-travel-data.mjs`). `/events`는 빌드일(KST) 기준 이번 주말(토·일)에 열리는 행사와 30일 안에 시작하는 행사를 보여 준다.

상세 대기와 숨김은 겉보기에 똑같이 페이지가 없다. 어느 쪽인지는 데이터 수집 로그의 `status` 줄로 구분한다.

지역에 공개 장소가 하나도 없으면 `lib/travel.ts`의 `SEED_ITEMS`로 대신 채운다.

## 노출 기준

| 대상 | 기준 | 정의 위치 |
|---|---|---|
| 테마 목록 페이지(전국, 지역별) | 장소 2곳 이상 | `MIN_LISTED_THEME_ITEMS`, `getListedThemeGroups` (`lib/travel.ts`) |
| 여행지 모음(컬렉션) | 스냅샷에 남은 장소 3곳 이상 | `getCollections` (`lib/collections.ts`) |

페이지, 내비게이션, 사이트맵, `llms.txt`는 같은 함수를 써서 서로 어긋나지 않게 한다.

## 여행지 모음 (collection)

직접 고른 장소 묶음. 소개 글(`intro`)과 팁(`tip`)을 직접 써서 이 사이트만의 내용을 담는다. 정의는 `lib/collections.ts`.
