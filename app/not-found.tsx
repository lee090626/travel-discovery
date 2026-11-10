import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";

export default function NotFound() {
  return (
    <div className="page-container not-found-page">
      <img className="not-found-mascot" src="/mascot-lost.svg" alt="지도를 들고 길을 잃은 뽈뽈이" width={200} height={163} />
      <span className="not-found-code">404</span>
      <Heading level={1}>앗, 뽈뽈이가 길을 잃었어요!</Heading>
      <Text as="p">찾으시는 페이지가 없거나 옮겨졌어요. 다른 여행지로 같이 뽈뽈 가볼까요?</Text>
      <div className="not-found-links">
        <Link className="button button-primary" href="/regions">지역 둘러보기</Link>
        <Link className="button button-secondary" href="/search">다시 검색하기</Link>
      </div>
    </div>
  );
}
