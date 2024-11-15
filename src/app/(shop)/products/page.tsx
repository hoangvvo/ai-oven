import { ProductCard } from "@/components/product-card";
import { Select } from "@/components/ui/select";
import {
  getCollections,
  getProducts,
  getProductsByCollectionId,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

async function CollectionList({ collectionId }: { collectionId?: string }) {
  const collections = await getCollections();

  const options = [
    { label: "All Products", value: "all", href: "/products" },
    ...collections.map((collection) => ({
      label: collection.name,
      value: collection.id,
      href: `/products?collection=${collection.id}`,
    })),
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-neutral-500">Collections</h3>

      <div className="md:hidden">
        <Select options={options} value={collectionId ?? "all"} />
      </div>

      <ul className="hidden md:flex md:flex-col gap-2">
        {options.map((option) => {
          const isSelected = option.value === (collectionId ?? "all");
          return (
            <li key={option.value} className="text-black">
              <Link
                href={option.href}
                className={cn(
                  "w-full text-sm hover:underline underline-offset-4",
                  isSelected && "font-bold",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
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

  return (
    <div className="container flex flex-col md:flex-row py-12">
      <div className="md:w-[200px]">
        <CollectionList collectionId={searchParams.collection} />
      </div>
      <div className="md:flex-1">
        <ProductList collectionId={searchParams.collection} />
      </div>
    </div>
  );
}
