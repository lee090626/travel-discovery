import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="page-container not-found-page">
      <span className="not-found-mark"><Icon name="compass" size={28} /></span>
      <Heading level={1}>아직 찾지 못했어요.</Heading>
      <Text as="p">현재 정보가 준비된 지역과 여행지만 보여드리고 있어요.</Text>
      <div className="not-found-links">
        <Link className="button button-primary" href="/regions">지역 둘러보기</Link>
        <Link className="button button-secondary" href="/search">다시 검색하기</Link>
      </div>
    </div>
  );
}
