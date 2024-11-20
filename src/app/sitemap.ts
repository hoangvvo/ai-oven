import { getProducts } from "@/lib/data";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts().catch(() => []);
  const lastModified = new Date();
  return [
    {
      url: `${process.env.APP_URL}/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.APP_URL}/products`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...products.map((product): MetadataRoute.Sitemap[number] => ({
      url: `${process.env.APP_URL}/products/${product.id}`,
      changeFrequency: "weekly",
      priority: 0.5,
      lastModified,
    })),
  ];
}
