import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Breadcrumbs, PlaceList, SectionHeading } from "@/components/travel-ui";
import { getCollection, getCollections } from "@/lib/collections";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCollections()).map(({ collection }) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = await getCollection(slug);
  if (!group) return pageMetadata("여행지 모음", "뽈뽈이가 골라 둔 국내 여행지 모음이에요.", "/collections");
  return pageMetadata(group.collection.title, group.collection.summary, "/collections/" + slug);
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const group = await getCollection(slug);
  if (!group) notFound();
  const { collection, items } = group;

  return (
    <div className="page-container listing-page">
      <JsonLd data={listingJsonLd(collection.title, items, [{ name: "여행지 모음", path: "/collections" }, { name: collection.title, path: "/collections/" + slug }])} />
      <Breadcrumbs items={[{ label: "여행지 모음", href: "/collections" }, { label: collection.title }]} />
      <header className="page-intro">
        <img className="intro-mascot" src="/mascot.svg" alt="뽈뽈이" width={160} height={130} />
        <Heading level={1}>{collection.title}</Heading>
        <Text as="p">{collection.intro}</Text>
        <Text as="p" className="collection-tip">뽈뽈이의 팁 · {collection.tip}</Text>
      </header>
      <section className="content-section last-section">
        <SectionHeading title={collection.title} description={items.length + "곳"} />
        <PlaceList items={items} />
      </section>
    </div>
  );
}
