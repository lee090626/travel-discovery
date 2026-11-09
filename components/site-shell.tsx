import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { Icon } from "@/components/icons";

const navigation = [
  { href: "/regions", label: "지역" },
  { href: "/themes", label: "테마" },
  { href: "/search", label: "검색" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="여행 찾기 홈">
          <span>여행 찾기</span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="brand footer-brand" href="/">
            <span>여행 찾기</span>
          </Link>
          <Text as="p">관광 정보는 방문 전에 공식 안내에서 한 번 더 확인해 주세요.</Text>
          <div className="footer-links">
            <Link href="/regions">지역별 탐색</Link>
            <Link href="/themes">테마별 탐색</Link>
            <Link href="/search">검색</Link>
          </div>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="하단 메뉴">
        <Link href="/"><Icon name="home" size={20} /><span>홈</span></Link>
        <Link href="/regions"><Icon name="pin" size={20} /><span>지역</span></Link>
        <Link href="/themes"><Icon name="compass" size={20} /><span>테마</span></Link>
        <Link href="/search"><Icon name="search" size={20} /><span>검색</span></Link>
      </nav>
    </>
  );
}
