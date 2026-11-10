// 세시간전(3hoursahead) 제휴 링크. 지역 숙소는 여기어때 지역 검색, 투어는 마이리얼트립 상품, 렌터카는 찜카 국내 렌터카 메인.
const DEFAULT_STAY_URL = "https://3ha.in/r/887679";

const STAY_URLS: Record<string, string> = {
  seoul: "https://3ha.in/r/887774",
  incheon: "https://3ha.in/r/887776",
  daejeon: "https://3ha.in/r/887777",
  daegu: "https://3ha.in/r/887778",
  gwangju: "https://3ha.in/r/887780",
  busan: "https://3ha.in/r/887781",
  ulsan: "https://3ha.in/r/887782",
  sejong: "https://3ha.in/r/887783",
  gyeonggi: "https://3ha.in/r/887784",
  gangwon: "https://3ha.in/r/887785",
  chungbuk: "https://3ha.in/r/887787",
  chungnam: "https://3ha.in/r/887789",
  gyeongbuk: "https://3ha.in/r/887790",
  gyeongnam: "https://3ha.in/r/887792",
  jeonbuk: "https://3ha.in/r/887793",
  jeonnam: "https://3ha.in/r/887794",
  jeju: "https://3ha.in/r/887795",
};

const TOURS: Record<string, { title: string; url: string }> = {
  seoul: { title: "서울 시내 역사 투어", url: "https://3ha.in/r/887797" },
  incheon: { title: "월미도 썬셋 불꽃 크루즈", url: "https://3ha.in/r/887961" },
  daegu: { title: "대구 이월드 자유이용권", url: "https://3ha.in/r/887952" },
  gwangju: { title: "5·18 사적지 인문 투어", url: "https://3ha.in/r/887953" },
  busan: { title: "부산투어패스", url: "https://3ha.in/r/887954" },
  ulsan: { title: "울산 요트 투어", url: "https://3ha.in/r/887955" },
  sejong: { title: "세종 공룡월드 이용권", url: "https://3ha.in/r/887956" },
  chungbuk: { title: "단양투어패스", url: "https://3ha.in/r/887957" },
  jeonnam: { title: "여수투어패스", url: "https://3ha.in/r/887958" },
  daejeon: { title: "대전 먹캉스 투어", url: "https://3ha.in/r/887800" },
  gyeonggi: { title: "경기투어패스 통합이용권", url: "https://3ha.in/r/887806" },
  gangwon: { title: "강릉 여행 투어", url: "https://3ha.in/r/887807" },
  chungnam: { title: "충남투어패스 통합권", url: "https://3ha.in/r/887809" },
  gyeongbuk: { title: "경북투어패스 신라", url: "https://3ha.in/r/887810" },
  gyeongnam: { title: "창원투어패스", url: "https://3ha.in/r/887812" },
  jeonbuk: { title: "전북투어패스 프리미엄권", url: "https://3ha.in/r/887813" },
  jeju: { title: "제주 프라이빗 자유 투어", url: "https://3ha.in/r/887815" },
};

export function stayUrl(regionSlug?: string) {
  return (regionSlug && STAY_URLS[regionSlug]) || process.env.AFFILIATE_URL?.trim() || DEFAULT_STAY_URL;
}

export function tourOffer(regionSlug?: string) {
  return regionSlug ? TOURS[regionSlug] : undefined;
}

export const RENTAL_URL = "https://3ha.in/r/887942";
