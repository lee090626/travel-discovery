# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router. Deployment is deferred; do not add a paid custom domain or service for the MVP.

## Users

Korean-speaking people planning domestic trips who want to find destinations and events by region and theme.

## Product Purpose

Help people discover useful places and events for a domestic trip through region- and theme-based browsing. Success means a visitor can find relevant, current options and use them to plan a trip.

## Positioning

MVP assumption: combine official Korea Tourism Organization data with region-based discovery. A distinct advantage beyond the source data and browsing flow is still undecided.

## Operating Context

The initial product is a Korean-language web experience for trip planning. The first use case is browsing domestic tourism options by region; mobile web is in scope as a responsive surface.

## Capabilities and Constraints

- MVP page system: a home discovery page, region landing pages, region-and-theme landing pages, and destination/event detail pages.
- Generated routes need useful, source-backed content. Do not publish empty pages or pages that only swap a region or theme name.
- Include route-specific metadata, canonical URLs, sitemap entries, and internal links for valid pages.
- Place clearly disclosed affiliate links where they fit the destination or event; account approval and referral IDs are not available yet. AdSense is a later option.
- Do not add accounts, saved itineraries, or booking checkout to this MVP.
- Add other filters only when the source data supports them.
- Use the Korea Tourism Organization Korean Tour API. Its API key must be obtained separately; production access is subject to the provider's review and quotas.
- Prefer free services and avoid upfront spend. Hosting is not selected, deployment is deferred, and no custom domain is approved.
- Use only data and images within their stated licenses. Do not invent destination facts, availability, prices, or reviews.
- Exact search demand, competition, and revenue are unknown; do not present them as validated.

## Evidence on Hand

- `docs/research/programmatic-seo-niche-candidates.md`: first-party source review of candidate data sources, affiliate path, and open risks.
- No product analytics, traffic, testimonials, or revenue evidence yet.

## Product Principles

- Every generated page must help a traveler make a real planning decision; do not publish pages that only swap a place name.
- Keep factual details tied to their source and show freshness when available.
- Label commercial links clearly and keep them secondary to useful trip information.
- Expand page coverage only after checking data quality and whether the page adds distinct value.
