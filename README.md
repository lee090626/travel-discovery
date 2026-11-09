<img src="assets/icon.svg" width="64" height="64" alt="">

# 여행 찾기

지역과 테마로 국내 여행지를 탐색하는 Next.js App Router MVP입니다. 모바일에서도 가볍게 장소를 둘러볼 수 있고, 지역·테마·장소 경로는 검색엔진이 읽을 수 있도록 별도 페이지로 제공됩니다.

공통 화면 규칙과 UI 토큰은 [DESIGN.md](DESIGN.md)에 정리했습니다.

## 시작

1. npm install
2. .env.example을 .env.local로 복사합니다.
3. 한국관광공사 TourAPI를 연결하려면 data.go.kr에서 받은 디코딩 서비스 키를 KTO_SERVICE_KEY에 넣습니다.
4. npm run dev를 실행합니다.

키가 없으면 부산·강릉·전주의 출처 링크가 붙은 소규모 선별 데이터로 동작합니다. 키를 설정하면 TourAPI 지역 관광지·문화시설·코스·음식점과 현재/예정 행사를 서버에서 조회합니다. 키는 브라우저에 보내지 않습니다.

## 검색 노출과 수익 링크

- SITE_URL에 무료 호스팅 주소를 넣기 전에는 모든 페이지가 noindex이고 robots.txt는 크롤링을 막으며 사이트맵은 비어 있습니다. 주소가 정해진 뒤에만 공개 검색 노출을 켭니다.
- TRIP_COM_AFFILIATE_URL이 설정된 경우 장소 상세 페이지에 제휴 고지와 함께 예약 링크가 표시됩니다. 승인된 제휴 URL이 없으면 링크는 숨겨집니다.
- AdSense는 아직 연결하지 않았습니다.

TourAPI 사진은 응답에 공공누리 제1·3유형이 확인된 경우에만 표시하고, 사진을 자르거나 가공하지 않으며 출처와 유형을 함께 표기합니다. [한국관광공사 TourAPI 이용 안내](https://www.data.go.kr/data/15101578/openapi.do)
