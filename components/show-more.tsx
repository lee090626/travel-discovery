"use client";

import { Children, useState, type ReactNode } from "react";

export function ShowMore({ children, step = 12, label = "여행지 더보기" }: { children: ReactNode; step?: number; label?: string }) {
  const items = Children.toArray(children);
  const [visible, setVisible] = useState(step);
  return (
    <>
      <div className="place-list">{items.slice(0, visible)}</div>
      {visible < items.length ? (
        <div className="show-more">
          <button type="button" onClick={() => setVisible((n) => n + step)}>
            {label} <span aria-hidden="true">↓</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
