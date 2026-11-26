"use client";

import { useState } from "react";

// 모바일은 OS 공유 시트(카카오톡 포함)를 열고, 지원하지 않으면 링크를 복사한다.
export function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button type="button" className="share-button" onClick={share}>
      {copied ? "링크를 복사했어요" : "친구에게 공유하기"}
    </button>
  );
}
