"use client";

import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Collection } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CollectionList({
  collectionId,
  collections,
  searchQuery,
}: {
  collectionId?: string;
  collections: Collection[];
  searchQuery?: string;
}) {
  const options = [
    { label: "All Products", value: "all", href: "/products" },
    ...collections.map((collection) => ({
      label: collection.name,
      value: collection.id,
      href:
        `/products?collection=${collection.id}` +
        (searchQuery ? `&q=${searchQuery}` : ""),
    })),
  ];

  const router = useRouter();

  const onOptionSelect = (value: string) => {
    const option = options.find((option) => option.value === value);
    if (!option) return;

    router.push(option.href);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-neutral-500">Collections</h3>

      <div className="md:hidden">
        <Select
          options={options}
          value={collectionId ?? "all"}
          className="w-full"
          onChange={(ev) => onOptionSelect(ev.currentTarget.value)}
          aria-label="Select a collection"
        />
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
