import { ProductCard } from "@/components/product-card";
import {
  getCollections,
  getProducts,
  getProductsByCollectionId,
} from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { CollectionList } from "./collection-list";

async function ProductList({
  collectionId,
  searchQuery,
}: {
  collectionId?: string;
  searchQuery?: string;
}) {
  let products = collectionId
    ? await getProductsByCollectionId(collectionId)
    : await getProducts();

  // yes, frontend source for demo purposes
  // we will move this to the backend in the next step
  if (searchQuery) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  return (
    <div>
      {searchQuery && (
        <div className="text-neutral-500 text-sm">
          Showing results for &ldquo;{searchQuery}&rdquo;.{" "}
          <Link
            href={
              "/products" + (collectionId ? `?collection=${collectionId}` : "")
            }
            className="underline"
          >
            Clear
          </Link>
        </div>
      )}

      {!products.length && (
        <div className="text-center text-lg text-neutral-700 p-24">
          No products found
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard
              product={product}
              imageProps={index < 3 ? { priority: true } : undefined}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

type SearchParams = { collection?: string; q?: string };

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
          searchQuery={searchParams.q}
        />
      </div>
      <div className="md:flex-1">
        <ProductList
          collectionId={searchParams.collection}
          searchQuery={searchParams.q}
        />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Products - AI Oven",
  description: "Explore our wide range of gourmet food and drinks.",
};
