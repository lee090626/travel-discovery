import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";
import { getAllTravelItems, getAvailableRegions, getRegionItems, getThemesWithItems } from "@/lib/travel";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  if (!origin) return [];

  const [regions, items] = await Promise.all([getAvailableRegions(), getAllTravelItems()]);
  const regionGroups = await Promise.all(regions.map(async (region) => ({
    region,
    items: await getRegionItems(region.slug),
  })));
  const routes: MetadataRoute.Sitemap = [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: origin + "/regions", changeFrequency: "weekly", priority: 0.8 },
    { url: origin + "/themes", changeFrequency: "weekly", priority: 0.8 },
  ];

  for (const { region, items: regionItems } of regionGroups) {
    routes.push({
      url: origin + "/regions/" + region.slug,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const { theme, items: themeItems } of getThemesWithItems(regionItems)) {
      if (themeItems.length < 2) continue;
      routes.push({
        url: origin + "/regions/" + region.slug + "/" + theme.slug,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  for (const { theme, items: themeItems } of getThemesWithItems(items)) {
    if (themeItems.length < 2) continue;
    routes.push({
      url: origin + "/themes/" + theme.slug,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const item of items) {
    routes.push({
      url: origin + "/places/" + item.id,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return routes;
}
