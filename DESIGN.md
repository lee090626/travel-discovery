# Travel Discovery Design System

## Visual direction

The approved home reference is [`docs/design/home-reference.webp`](docs/design/home-reference.webp). The site is a calm, destination-first travel guide: editorial typography, generous warm-white space, restrained mint accents, and useful source-backed information. The interface does not speak as an assistant and has no mascot, chat bubbles, or decorative landscape illustrations.

The wide beach asset in [`public/images/coastline-atmosphere.webp`](public/images/coastline-atmosphere.webp) is AI-generated atmosphere imagery. It is not a photograph of Gangneung or any named attraction; the home recommendation labels it as a reference image. TourAPI photos appear only when their response includes a supported Public Nuri Type 1 or Type 3 license. They keep their original image data and full frame, with the source and license shown beside them.

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| `--page` | `#FCFBF8` | Warm page canvas |
| `--surface` | `#FFFFFF` | Inputs and content surfaces |
| `--surface-soft` | `#EEF7F0` | Quiet green accent surface |
| `--ink` | `#17211B` | Main text |
| `--muted` | `#526158` | Supporting text |
| `--line` | `#DFE8E1` | Separators and borders |
| `--accent` | `#78E58C` | Primary action |
| `--green` | `#267549` | Links, icons, focus detail |

Spacing follows a 4px base scale (`4, 8, 12, 16, 24, 32, 48, 64, 96`). Content uses a 1360px desktop maximum; directory and detail pages narrow to 1060px. Controls use 14px radii, list surfaces 16px, and the home recommendation panel 26px. Lists use separators instead of a grid of nested cards.

## Type and icons

Use Noto Sans KR from Google Fonts at weights 400–800, with Apple SD Gothic Neo and Malgun Gothic as local fallbacks. The font is available under the SIL Open Font License; see [Google Fonts source](https://fonts.google.com/specimen/Noto+Sans+KR) and [Noto license](https://github.com/notofonts/noto-fonts/blob/main/LICENSE). Display headings use tight but readable tracking; body copy stays at 15–18px with comfortable line height.

Use the existing `Icon` component for small functional symbols. The wordmark is text only. Do not add a branded character or substitute emoji/text glyphs for icons.

## Shared components

- `SiteHeader`: text wordmark and three links (`지역`, `테마`, `검색`).
- `SearchForm`: default compact form and stacked home variant; both submit to `/search`.
- `FeaturedPlace`: one recommended destination with source, image disclosure, and detail link.
- `SectionHeading`, `RegionCard`, `ThemeCard`, `ThemePill`, `PlaceList`: shared hierarchy and browse patterns.
- `Breadcrumbs`, `SourceNote`, `AffiliateLink`: route context, factual provenance, and optional disclosed commercial link.

## Screen patterns

- **Home:** two-column hero with the trip search on the left and one recommendation on the right; region and theme discovery continue below the fold.
- **Region and theme directories:** focused introduction followed by compact separator-based links.
- **Region/theme landing pages:** breadcrumb, route-specific heading, available theme links, and source-backed place rows.
- **Place detail:** licensed source photos, factual location and description, available visit details, a source link, and an optional disclosed affiliate link.
- **Search:** one working search form, matching place rows, and a clear empty state.
- **Small screens:** one-column content, compact header, fixed four-item bottom navigation, and controls that remain easy to tap.

## Interaction and accessibility

All links and controls have visible keyboard focus, body and placeholder text meet readable contrast, and reduced-motion preferences are respected. Hover changes are subtle and never carry information by themselves. Source links remain visible on detail screens; affiliate links stay clearly disclosed and secondary.
