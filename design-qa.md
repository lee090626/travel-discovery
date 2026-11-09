# 디자인 QA

Current result: TourAPI region and place detail pages render. The list fallback was caused by cached HTTP 200 provider errors; detail lookup also sent retired query flags and received a parameter error.

## 기준과 캡처

- 선택 시안: `docs/design/home-reference.webp` (1487 × 1058 px).
- 데스크톱 구현: `output/playwright/home-desktop.png` (1487 × 1058 px, CSS 뷰포트 1487 × 1058, DPR 1).
- 전체 비교: `output/playwright/home-desktop-comparison.png`. 시안을 왼쪽, 구현 화면을 오른쪽에 원본 크기로 붙였습니다. 두 화면 모두 초기 홈 화면 상태입니다.
- 밀도 정규화: 시안과 구현 모두 1x 픽셀 크기이며 Playwright 캡처는 CSS 픽셀 배율을 사용했습니다. 별도 리사이즈 없이 비교했습니다.
- 모바일·태블릿: 홈, 지역 상세, 장소 상세와 검색 빈 결과를 390 × 844 px 및 홈을 768 × 1024 px에서 확인했습니다.
- 주요 화면 캡처: `output/playwright/`의 `regions-desktop.png`, `region-gangwon-desktop.png`, `region-theme-desktop.png`, `themes-desktop.png`, `theme-nature-desktop.png`, `search-empty-desktop.png`, `search-results-desktop.png`, `search-no-results-mobile.png`, `place-detail-desktop.png`.

## 비교 결과

- **폰트와 타이포그래피:** Noto Sans KR과 한글 시스템 폴백, 굵기 단계, 큰 제목과 본문 위계가 시안 방향과 맞습니다. 데스크톱 제목 줄바꿈과 크기가 유사하고 모바일에서도 제목·본문이 잘리지 않았습니다.
- **간격과 레이아웃:** 데스크톱 홈의 두 열, 왼쪽 검색, 오른쪽 추천 장소가 유지됩니다. 구현 콘텐츠 최대 폭 1360px, 추천 패널 모서리 26px로 확인했습니다. 지역·테마·검색·상세 화면은 중앙 정렬과 구분선 목록을 공유합니다.
- **색상과 토큰:** 따뜻한 흰 배경, 짙은 녹색 본문, 민트 포인트를 `DESIGN.md` 토큰에 맞췄습니다. 본문·보조 문구의 대비나 상태 색에서 눈에 띄는 문제를 발견하지 못했습니다.
- **이미지:** 추천 카드의 해안 이미지는 시안의 해변 분위기와 맞는 AI 생성 이미지입니다. 실제 관광지 사진으로 오인하지 않도록 카드에 참고 이미지와 AI 생성 이미지 안내를 표시합니다.
- **문구와 아이콘:** 여행 탐색에 필요한 한국어 안내로 구성했고 비서 말투·캐릭터는 없습니다. 기능 아이콘은 공통 `Icon` 컴포넌트를 사용합니다.
- **반응형:** 390px, 768px, 1487px에서 가로 넘침이 없었습니다. 390px 지역·상세·빈 결과 화면의 `scrollWidth`가 뷰포트 폭과 같았습니다. 하단 메뉴는 모바일에서만 표시되고 긴 목록은 스크롤로 계속 볼 수 있습니다.
- **접근성과 동작:** 검색 입력에 접근 가능한 이름이 있고, 관광 이미지에는 설명 대체 텍스트가 있습니다. 키보드 Tab 포커스에서 3px 녹색 외곽선을 확인했습니다. 검색창에 `강릉`을 입력하고 Enter를 누르면 결과 4곳이 표시되며, 첫 결과를 누르면 `/places/anmok-beach`로 이동합니다. 일치 항목이 없는 검색어에서는 빈 결과 안내가 표시됩니다.

## 브라우저 검수 경로

`/`, `/regions`, `/regions/gangwon`, `/regions/gangwon/nature`, `/themes`, `/themes/nature`, `/search`, `/search?q=강릉`, `/search?q=zzzz-no-match`, `/places/anmok-beach`를 열어 제목과 화면을 확인했습니다. 초기 첫 페이지 요청에서 `/favicon.ico` 404 한 건이 기록됐고, 이후 경로 확인 시 브라우저 콘솔 오류는 없었습니다. 화면 동작에는 영향이 없으며 파비콘은 후속 시각 자산 작업으로 남깁니다.

## Findings

- P0/P1/P2: 없음. 첫 전체 비교에서 수정이 필요한 우선순위 이슈가 발견되지 않았습니다.

## Open Questions

- 없음.

## 검수 이력

- P0/P1/P2 수정 이력은 없습니다. 첫 전체 비교에서 통과했습니다.
- Impeccable detector: `app`, `app/globals.css`, `components` 검사 결과 `[]`.
- `npm run build`는 화면 구현 후 앞선 작업에서 통과했습니다. 이번 검수에서는 소스 파일을 바꾸지 않았습니다.

## Follow-up Polish

- P3: 첫 로드에서 사이트 파비콘이 없어 `/favicon.ico` 404가 한 번 발생했습니다. 브랜드에 맞는 파비콘을 추가하면 됩니다.

## 구현 체크리스트

- [x] 시안과 홈 화면을 같은 1487 × 1058 CSS 크기에서 비교
- [x] 데스크톱·태블릿·모바일 화면 확인
- [x] 지역·테마·검색·상세 주요 경로 확인
- [x] 검색 성공·빈 결과·키보드 포커스 확인
- [x] 디자인 시스템과 브라우저 검수 기록 저장

## 2026-11-09 장소 정보·사진 보강

- [x] 장소 상세에 주소와 API가 제공하는 전화번호·홈페이지·이용 정보를 표시하도록 연결
- [x] 추천·목록·상세에 TourAPI 사진 경로를 연결하고, 공공누리 제1·3유형과 출처를 함께 표시
- [x] 사진 원본을 가공하거나 자르지 않도록 전체 비율로 렌더링
- [x] `npm run build` 통과, 변경 UI detector 결과 `[]`
- [x] Playwright에서 장소 상세 데스크톱·모바일(390px)과 홈 데스크톱을 확인; 모바일 상세의 문서 폭 375px, 스크롤 폭 375px
- [x] TourAPI 오류 캐시를 수정했습니다. `localhost:3000/regions/gangwon`에서 113곳, `/regions/jeju`에서 89곳의 API 장소 카드가 렌더링되고 새로고침 후에도 유지되는 것을 확인했습니다. `npx tsc --noEmit` 통과.
- [x] `detailCommon2`에서 제거된 `defaultYN`, `addrinfoYN`, `mapinfoYN`, `overviewYN`을 빼고, 오류 응답의 최상위 `resultCode`도 확인하도록 수정했습니다. 상세 화면의 404 원인이었던 결과 코드 `10`이 사라졌고, `/places/2715990` 및 첨부 화면의 `/places/1855403`이 상세 정보로 렌더링됩니다.
- [ ] 원격 이미지가 실제 브라우저에서 로드되는지는 별도로 확인하지 않았습니다.

검수 캡처: `output/playwright/place-detail-desktop-after.png`, `output/playwright/place-detail-mobile-after.png`, `output/playwright/home-desktop-after.png`. 브라우저 콘솔에는 기존 `/favicon.ico` 404가 한 번 남아 있습니다.
