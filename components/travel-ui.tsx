import { BreadcrumbItem, Breadcrumbs as AstryxBreadcrumbs } from "@astryxdesign/core/Breadcrumbs";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { ShowMore } from "@/components/show-more";
import type { Region, Theme, TravelItem, TravelPhoto } from "@/lib/travel";
import { eventPeriod, getTheme } from "@/lib/travel";
import { RENTAL_URL, stayUrl, tourOffer } from "@/lib/affiliate";

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

const TINTS = ["tint-pink", "tint-yellow", "tint-mint", "tint-lilac"];

export function RegionCard({ region, count, index = 0 }: { region: Region; count: number; index?: number }) {
  return (
    <Link className="region-card" href={"/regions/" + region.slug}>
      <span className={"region-card-tint " + TINTS[index % TINTS.length]} aria-hidden="true" />
      <span className="region-card-copy">
        <strong>{region.name}</strong>
        <span>{count}곳 · 이 지역 여행지 보기 →</span>
      </span>
    </Link>
  );
}

export function CollectionCard({ slug, title, summary, count, index = 0 }: { slug: string; title: string; summary: string; count: number; index?: number }) {
  return (
    <Link className="region-card collection-card" href={"/collections/" + slug}>
      <span className={"region-card-tint " + TINTS[index % TINTS.length]} aria-hidden="true" />
      <span className="region-card-copy">
        <strong>{title}</strong>
        <span>{summary}</span>
        <span>{count}곳 · 모음 보기 →</span>
      </span>
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

export function ThemePill({ theme, href, label, current }: { theme?: Theme; href: string; label?: string; current?: boolean }) {
  return (
    <Link className={"theme-pill" + (current ? " is-current" : "")} href={href} aria-current={current ? "page" : undefined}>
      {label || theme?.name}
    </Link>
  );
}

export function RegionBanner({ title, description, count }: { title: string; description: string; count: number }) {
  return (
    <header className="region-banner">
      <div>
        <Heading level={1}>{title}</Heading>
        <Text as="p">{description}</Text>
        <span className="region-banner-count">여행지 {count}곳</span>
      </div>
      <img className="intro-mascot" src="/mascot-map.svg" alt="지도를 펼친 뽈뽈이" width={160} height={130} />
    </header>
  );
}

export function RegionThemeNav({ regionSlug, themes, current }: { regionSlug: string; themes: Theme[]; current?: string }) {
  if (!themes.length) return null;
  return (
    <section className="content-section compact-section" aria-labelledby="region-theme-nav">
      <Heading level={2} id="region-theme-nav" className="small-heading">테마로 좁혀보기</Heading>
      <div className="theme-pills">
        <ThemePill href={"/regions/" + regionSlug} label="전체" current={!current} />
        {themes.map((theme) => (
          <ThemePill key={theme.slug} theme={theme} href={"/regions/" + regionSlug + "/" + theme.slug} current={current === theme.slug} />
        ))}
      </div>
    </section>
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
        <span className={"place-card-photo theme-" + item.themeSlug}>
          {photo ? (
            <>
              <Image src={photo.url} alt="" fill sizes="(max-width: 680px) 100vw, 360px" unoptimized />
              <span className="place-card-photo-credit">
                한국관광공사 · {photo.license === "Type1" ? "제1유형" : "제3유형"}
              </span>
            </>
          ) : (
            <Icon name={theme?.icon || "compass"} size={34} />
          )}
        </span>
        <span className="place-card-copy">
          {theme ? <span className="place-card-theme">{theme.name}</span> : null}
          <strong>{item.title}</strong>
          <span className="place-meta">
            <span>{item.regionName}</span>
            {period ? <span>{period}</span> : null}
          </span>
        </span>
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
    <ShowMore>
      {items.map((item) => <PlaceCard key={item.id} item={item} />)}
    </ShowMore>
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

export function AffiliateLink({ regionSlug, regionName }: { regionSlug?: string; regionName?: string }) {
  const tour = tourOffer(regionSlug);
  const rel = "sponsored nofollow noopener noreferrer";

  return (
    <aside className="affiliate-note" aria-labelledby="affiliate-title">
      <div className="affiliate-head">
        <img src="/mascot.svg" alt="" width={44} height={36} />
        <Heading level={2} id="affiliate-title">뽈뽈이의 여행 준비</Heading>
      </div>
      <Link href={stayUrl(regionSlug)} target="_blank" rel={rel} isExternalLink>
        {regionName ? regionName + " 숙소 보기" : "숙소 보기"} <Icon name="arrow" size={17} />
      </Link>
      {tour ? (
        <Link href={tour.url} target="_blank" rel={rel} isExternalLink>
          {tour.title} <Icon name="arrow" size={17} />
        </Link>
      ) : null}
      <Link href={RENTAL_URL} target="_blank" rel={rel} isExternalLink>
        렌터카 알아보기 <Icon name="arrow" size={17} />
      </Link>
      <Text as="p">광고 · 이 링크는 제휴마케팅의 일환으로, 예약 시 사이트가 일정액의 수수료를 제공받습니다.</Text>
    </aside>
  );
}
