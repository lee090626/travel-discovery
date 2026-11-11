"use client";

import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { SearchForm } from "@/components/astryx-search-form";
import { ShowMore } from "@/components/show-more";

const SUGGESTIONS = ["부산", "바다", "한옥마을"];

export type SearchEntry = { id: string; haystack: string; card: ReactNode };

export function SearchResults({ entries }: { entries: SearchEntry[] }) {
  const raw = useSearchParams().get("q") || "";
  const query = raw.trim().slice(0, 80);
  const needle = query.toLocaleLowerCase("ko-KR");
  const matches = query ? entries.filter((entry) => entry.haystack.includes(needle)) : [];

  return (
    <>
      <SearchForm key={query} initialValue={query} />
      {query ? (
        <section className="content-section search-results">
          <div className="section-heading">
            <div>
              <Heading level={2}>검색 결과</Heading>
              <Text as="p">{matches.length + "곳을 찾았어요."}</Text>
            </div>
          </div>
          {matches.length ? (
            <ShowMore>{matches.map((entry) => <div key={entry.id} style={{ display: "contents" }}>{entry.card}</div>)}</ShowMore>
          ) : (
            <div className="empty-state">
              <img className="empty-mascot" src="/mascot-empty.svg" alt="갸우뚱하는 뽈뽈이" width={140} height={114} />
              <strong>앗, 뽈뽈이도 못 찾았어요.</strong>
              <Text as="p">지역이나 테마를 바꾸어 다시 찾아보세요.</Text>
              <div className="theme-pills">
                {SUGGESTIONS.map((word) => <Link key={word} className="theme-pill" href={"/search?q=" + encodeURIComponent(word)}>{word}</Link>)}
              </div>
            </div>
          )}
        </section>
      ) : (
        <Text as="p" className="search-hint">검색어 예: 부산, 바다, 한옥마을</Text>
      )}
    </>
  );
}
