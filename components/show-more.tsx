"use client";

import { Children, isValidElement, useEffect, useState, type ReactNode } from "react";

// 펼친 개수는 탭 세션에 페이지별로 기억해, 상세 페이지에 갔다가 뒤로 와도 유지한다.
function storageKey(label: string) {
  return "show-more:" + window.location.pathname + window.location.search + ":" + label;
}

export function ShowMore({ children, step = 12, label = "여행지 더보기" }: { children: ReactNode; step?: number; label?: string }) {
  const items = Children.toArray(children);
  const [visible, setVisible] = useState(step);

  useEffect(() => {
    try {
      const saved = Number(sessionStorage.getItem(storageKey(label)));
      if (saved > step) setVisible(saved);
    } catch {}
  }, [label, step]);

  function showMore() {
    const next = visible + step;
    setVisible(next);
    try {
      sessionStorage.setItem(storageKey(label), String(next));
    } catch {}
  }

  // 숨긴 항목도 HTML에는 모두 남겨, 크롤러가 전체 장소 링크를 따라갈 수 있게 한다.
  return (
    <>
      <div className="place-list">
        {items.map((item, index) => (
          <div key={isValidElement(item) && item.key != null ? item.key : index} className="show-more-item" style={{ display: index < visible ? "contents" : "none" }}>{item}</div>
        ))}
      </div>
      {visible < items.length ? (
        <div className="show-more">
          <button type="button" onClick={showMore}>
            {label} <span aria-hidden="true">↓</span>
          </button>
        </div>
      ) : null}
      {/* 자바스크립트가 꺼져 더보기 버튼이 동작하지 않으면 전부 펼쳐 보여 준다. */}
      <noscript><style>{".show-more-item{display:contents!important}.show-more{display:none}"}</style></noscript>
    </>
  );
}
