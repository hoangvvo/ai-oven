import { ProductCard } from "@/components/product-card";
import {
  getCollections,
  getProducts,
  getProductsByCollectionId,
} from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { CollectionList } from "./collection-list";

async function ProductList({ collectionId }: { collectionId?: string }) {
  const products = collectionId
    ? await getProductsByCollectionId(collectionId)
    : await getProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

type SearchParams = { collection?: string };

export default async function ProductsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  const collections = await getCollections();
  return (
    <div className="container flex flex-col md:flex-row py-12">
      <div className="md:w-[200px]">
        <CollectionList
          collectionId={searchParams.collection}
          collections={collections}
        />
      </div>
      <div className="md:flex-1">
        <ProductList collectionId={searchParams.collection} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Products - AI Oven",
  description: "Explore our wide range of gourmet food and drinks.",
};
