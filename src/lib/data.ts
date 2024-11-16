"use server";

import { db } from "@/db";
import {
  collectionsTable,
  ordersTable,
  productCollectionsTable,
} from "@/db/schema";
import { Collection, Product } from "@/types";
import { and, desc, eq, inArray } from "drizzle-orm";
import { cache } from "react";

export const getCollections = cache(async () => {
  return db.query.collectionsTable.findMany();
});

export const getCollectionsByIds = cache(
  async (ids: string[]): Promise<Collection[]> => {
    return db.query.collectionsTable.findMany({
      where: inArray(collectionsTable.id, ids),
    });
  },
);

export const getProducts = cache(async (): Promise<Product[]> => {
  return db.query.productsTable.findMany();
});

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  return db.query.productsTable
    .findFirst({
      where: eq(collectionsTable.id, id),
    })
    .then((product) => product ?? null);
});

export const getProductsByCollectionId = cache(
  async (id: string): Promise<Product[]> => {
    const productCollections = await db.query.productCollectionsTable.findMany({
      where: eq(productCollectionsTable.collection_id, id),
      with: {
        product: true,
      },
    });

    return productCollections.map((pc) => pc.product);
  },
);

export const getOrdersByUserId = cache(async (userId: number) => {
  return db.query.ordersTable.findMany({
    where: eq(ordersTable.user_id, userId),
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
    orderBy: desc(ordersTable.created_at),
  });
});

export const getOrderByIdAndUserId = cache(
  async ({ orderId, userId }: { orderId: number; userId: number }) => {
    return db.query.ordersTable
      .findFirst({
        where: and(
          eq(ordersTable.id, orderId),
          eq(ordersTable.user_id, userId),
        ),
        with: {
          orderItems: {
            with: {
              product: true,
            },
          },
        },
      })
      .then((order) => order ?? null);
  },
);
