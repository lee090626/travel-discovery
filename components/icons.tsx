import type { ReactNode } from "react";

export type IconName = "search" | "pin" | "arrow" | "home" | "compass" | "chat" | "waves" | "landmark" | "walk" | "route" | "food" | "calendar";

const paths: Record<IconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  home: <><path d="m3.5 10 8.5-7 8.5 7" /><path d="M5.5 9v11h13V9" /><path d="M9.5 20v-6h5v6" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z" /></>,
  chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-7.5A7.5 7.5 0 0 1 10.5 6H12" /><path d="M15 3h.01M18.5 6.5h.01M19 3l-5 5" /></>,
  waves: <><path d="M3 8c2.3 0 2.3-2 4.7-2s2.3 2 4.6 2 2.4-2 4.7-2 2.4 2 4.7 2" /><path d="M3 13c2.3 0 2.3-2 4.7-2s2.3 2 4.6 2 2.4-2 4.7-2 2.4 2 4.7 2" /><path d="M3 18c2.3 0 2.3-2 4.7-2s2.3 2 4.6 2 2.4-2 4.7-2 2.4 2 4.7 2" /></>,
  landmark: <><path d="m3 9 9-6 9 6" /><path d="M4 20h16M5.5 9.5V18m4.3-8.5V18m4.4-8.5V18m4.3-8.5V18" /><path d="M3 20h18" /></>,
  walk: <><circle cx="14.5" cy="5" r="2" /><path d="m11.5 10 3-1.5 2 3.5 3 1.5M11.5 10 9 14l-3.5 1.5M12 13l3 3.5-1 4M9 15l1.5 5" /></>,
  route: <><circle cx="6" cy="18" r="2.3" /><circle cx="18" cy="6" r="2.3" /><path d="M8 18h2.5a3.5 3.5 0 0 0 3.5-3.5V9.5A3.5 3.5 0 0 1 17.5 6H18" /></>,
  food: <><path d="M5 3v7m4-7v7M5 7h4m-2 3v11M15 3v18m0-18c3 2 4 5 4 8h-4" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4m9-4v4M3.5 9h17m-12 4h2m3 0h2m-7 4h2" /></>,
};

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
