import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userEnum = pgEnum("user_role", ["admin", "user"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  phone_number: varchar({ length: 50 }),
  address: text(),
  city: varchar({ length: 100 }),
  country: varchar({ length: 50 }),
  role: userEnum(),
  created_at: timestamp().notNull().defaultNow(),
});

export type UserEntity = InferSelectModel<typeof usersTable>;

export const collectionsTable = pgTable("collections", {
  id: varchar({ length: 50 }).primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  description: text(),
  image_url: varchar({ length: 255 }).notNull(),
});

export type CollectionEntity = InferSelectModel<typeof collectionsTable>;

export const productsTable = pgTable("products", {
  id: varchar({ length: 50 }).primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  description: text(),
  ingredients: text(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  discount_percent: decimal({ precision: 5, scale: 2 }),
  image_urls: varchar({ length: 255 }).array().notNull(),
  stock_quantity: integer().notNull(),
  featured: boolean().notNull().default(false),
});

export type ProductEntity = InferSelectModel<typeof productsTable>;

export const productCollectionsTable = pgTable(
  "product_collections",
  {
    product_id: varchar({ length: 50 })
      .references(() => productsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    collection_id: varchar({ length: 50 })
      .references(() => collectionsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.product_id, table.collection_id],
    }),
  }),
);

export const productCollectionRelations = relations(
  productCollectionsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productCollectionsTable.product_id],
      references: [productsTable.id],
    }),
    collection: one(collectionsTable, {
      fields: [productCollectionsTable.collection_id],
      references: [collectionsTable.id],
    }),
  }),
);

export type ProductCollectionEntity = InferSelectModel<
  typeof productCollectionsTable
>;
