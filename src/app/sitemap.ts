import { getProducts } from "@/lib/data";
import type { MetadataRoute } from "next";

export const revalidate = 60 * 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts().catch(() => []);
  return [
    {
      url: `${process.env.APP_URL}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.APP_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...products.map((product): MetadataRoute.Sitemap[number] => ({
      url: `${process.env.APP_URL}/products/${product.id}`,
      changeFrequency: "weekly",
      priority: 0.5,
    })),
  ];
}
