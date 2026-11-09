"use client";

import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { SearchForm } from "@/components/astryx-search-form";
import { Icon } from "@/components/icons";

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
            <div className="place-list">{matches.map((entry) => <div key={entry.id} style={{ display: "contents" }}>{entry.card}</div>)}</div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon"><Icon name="search" size={22} /></span>
              <strong>아직 이 검색어로 찾은 곳이 없어요.</strong>
              <Text as="p">지역이나 테마를 바꾸어 다시 찾아보세요.</Text>
            </div>
          )}
        </section>
      ) : (
        <Text as="p" className="search-hint">검색어 예: 부산, 바다, 한옥마을</Text>
      )}
    </>
  );
}
