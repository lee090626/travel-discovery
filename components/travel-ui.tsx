import { BreadcrumbItem, Breadcrumbs as AstryxBreadcrumbs } from "@astryxdesign/core/Breadcrumbs";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import Image from "next/image";
import { Icon } from "@/components/icons";
import type { Region, Theme, TravelItem, TravelPhoto } from "@/lib/travel";
import { affiliateUrl, eventPeriod, getTheme } from "@/lib/travel";

function publicNuriLabel(license: TravelPhoto["license"]) {
  return license === "Type1" ? "공공누리 제1유형" : "공공누리 제3유형";
}

export function FeaturedPlace({ item }: { item: TravelItem }) {
  const theme = getTheme(item.themeSlug);
  const photo = item.imageUrl && item.imageLicense
    ? { url: item.imageUrl, license: item.imageLicense }
    : undefined;
  return (
    <aside className="featured-place" aria-labelledby="featured-place-title">
          <Heading level={2} id="featured-place-title">이번 주말 추천</Heading>
      <Link className={"featured-image-link" + (photo ? " featured-image-licensed" : "")} href={"/places/" + item.id}>
        <Image
          src={photo?.url || "/images/coastline-atmosphere.webp"}
          alt={photo ? item.title + " 한국관광공사 대표 사진" : "여행 분위기 참고용으로 생성한 동해안 해변 이미지"}
          fill
          priority
          unoptimized={Boolean(photo)}
          sizes="(max-width: 900px) 100vw, 52vw"
        />
        <span className="image-disclosure">
          {photo ? "한국관광공사 · " + publicNuriLabel(photo.license) : "분위기 참고 이미지"}
        </span>
      </Link>
      <div className="featured-place-content">
        <div>
          <Heading level={3}>{item.title}</Heading>
          <Text as="p" className="featured-place-meta">{item.regionName}{theme ? " · " + theme.name : ""}</Text>
          <Text as="p" className="featured-image-note">
            {photo ? "사진 제공: 한국관광공사 · " + publicNuriLabel(photo.license) : "여행지 사진이 아닌 AI 생성 이미지예요."}
          </Text>
          <Text as="p" className="featured-place-source">{item.sourceName}</Text>
        </div>
        <Link className="featured-place-link" href={"/places/" + item.id}>
          여행지 보기 <Icon name="arrow" size={17} />
        </Link>
      </div>
    </aside>
  );
}

export function SectionHeading({
  title,
  description,
  href,
  linkLabel = "더 둘러보기",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Heading level={2}>{title}</Heading>
        {description ? <Text as="p">{description}</Text> : null}
      </div>
      {href ? <Link className="text-link" href={href}>{linkLabel}<Icon name="arrow" size={17} /></Link> : null}
    </div>
  );
}

export function RegionCard({ region, count }: { region: Region; count: number }) {
  return (
    <Link className="region-card" href={"/regions/" + region.slug}>
      <span className="region-card-icon"><Icon name="pin" size={22} /></span>
      <span className="region-card-copy">
        <strong>{region.name}</strong>
        <span>{count}곳 둘러보기</span>
      </span>
      <Icon name="arrow" size={18} />
    </Link>
  );
}

export function ThemeCard({ theme, count, regionCount }: { theme: Theme; count: number; regionCount: number }) {
  return (
    <Link className={"theme-card theme-" + theme.slug} href={"/themes/" + theme.slug}>
      <span className="theme-icon"><Icon name={theme.icon} size={23} /></span>
      <span className="theme-card-copy">
        <strong>{theme.name}</strong>
        <span>{regionCount}개 지역 · {count}곳</span>
      </span>
      <Icon name="arrow" size={18} />
    </Link>
  );
}

export function ThemePill({ theme, href }: { theme: Theme; href: string }) {
  return (
    <Link className="theme-pill" href={href}>
      <Icon name={theme.icon} size={17} />
      <span>{theme.name}</span>
      <Icon name="arrow" size={15} />
    </Link>
  );
}

export function PlaceCard({ item }: { item: TravelItem }) {
  const theme = getTheme(item.themeSlug);
  const period = eventPeriod(item);
  const photo = item.imageUrl && item.imageLicense
    ? { url: item.imageUrl, license: item.imageLicense }
    : undefined;
  return (
    <article className="place-card">
      <Link className="place-card-link" href={"/places/" + item.id}>
        {photo ? (
          <span className="place-card-photo">
            <Image src={photo.url} alt="" fill sizes="112px" unoptimized />
            <span className="place-card-photo-credit">
              한국관광공사 · {photo.license === "Type1" ? "제1유형" : "제3유형"}
            </span>
          </span>
        ) : (
          <span className={"place-symbol theme-" + item.themeSlug}>
            <Icon name={theme?.icon || "compass"} size={25} />
          </span>
        )}
        <span className="place-card-copy">
          <span className="place-meta">
            <span>{item.regionName}</span>
            {period ? <span>{period}</span> : null}
          </span>
          <strong>{item.title}</strong>
          <span className="place-description">{item.description || item.address || "한국관광공사 관광정보를 확인해 보세요."}</span>
        </span>
        <Icon name="arrow" size={18} />
      </Link>
    </article>
  );
}

export function PlaceGallery({ item }: { item: TravelItem }) {
  const cover = item.imageUrl && item.imageLicense
    ? { url: item.imageUrl, license: item.imageLicense, name: item.title }
    : undefined;
  const photos = item.photos?.length ? item.photos : cover ? [cover] : [];
  if (!photos.length) return null;

  return (
    <section className="detail-gallery" aria-label={item.title + " 사진"}>
      {photos.slice(0, 8).map((photo, index) => (
        <figure className="detail-photo" key={photo.url + index}>
          <div className="detail-photo-image">
            <Image
              src={photo.url}
              alt={photo.name ? item.title + " 사진: " + photo.name : item.title + " 관광 사진"}
              fill
              sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 520px"
              unoptimized
            />
          </div>
          <figcaption>
            <span>{photo.name || item.title}</span>
            <span>한국관광공사 · {publicNuriLabel(photo.license)}</span>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

export function PlaceList({ items }: { items: TravelItem[] }) {
  return (
    <div className="place-list">
      {items.map((item) => <PlaceCard key={item.id} item={item} />)}
    </div>
  );
}

export function SourceNote({ item }: { item: TravelItem }) {
  return (
    <div className="source-note">
      <span>정보 출처</span>
      <strong>{item.sourceName}</strong>
      <Link href={item.sourceUrl} target="_blank" rel="noreferrer" isExternalLink>
        원문 확인 <Icon name="arrow" size={15} />
      </Link>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <AstryxBreadcrumbs className="breadcrumbs" label="현재 위치">
      <BreadcrumbItem href="/">홈</BreadcrumbItem>
      {items.map((item, index) => (
        <BreadcrumbItem key={item.label + index} href={item.href} isCurrent={!item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </AstryxBreadcrumbs>
  );
}

export function AffiliateLink() {
  const href = affiliateUrl();
  if (!href) return null;

  return (
    <aside className="affiliate-note">
      <div>
        <strong>숙소도 함께 살펴볼까요?</strong>
        <Text as="p">광고 · 이 링크는 제휴마케팅의 일환으로, 예약 시 사이트가 일정액의 수수료를 제공받습니다.</Text>
      </div>
      <Link href={href} target="_blank" rel="sponsored nofollow noopener noreferrer" isExternalLink>
        숙소 찾아보기 <Icon name="arrow" size={17} />
      </Link>
    </aside>
  );
}
