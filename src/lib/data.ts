import { db } from "@/db";
import { collectionsTable, productCollectionsTable } from "@/db/schema";
import { Collection, Product } from "@/types";
import { eq, inArray } from "drizzle-orm";

export async function getCollections(): Promise<Collection[]> {
  return db.query.collectionsTable.findMany();
}

export async function getCollectionsByIds(
  ids: string[],
): Promise<Collection[]> {
  return db.query.collectionsTable.findMany({
    where: inArray(collectionsTable.id, ids),
  });
}

export async function getProducts(): Promise<Product[]> {
  return db.query.productsTable.findMany();
}

export async function getProduct(id: string): Promise<Product | null> {
  return db.query.productsTable.findFirst({
    where: eq(collectionsTable.id, id),
  }).then((product) => product ?? null);
}

export async function getProductsByCollectionId(
  collectionId: string,
): Promise<Product[]> {
  const productCollections = await db.query.productCollectionsTable.findMany({
    where: eq(productCollectionsTable.collection_id, collectionId),
    with: {
      product: true,
    },
  });

  return productCollections.map((pc) => pc.product);
}
