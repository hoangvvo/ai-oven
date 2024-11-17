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
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  phone_number: varchar({ length: 50 }),
  address: text(),
  city: varchar({ length: 100 }),
  country_code: varchar({ length: 10 }),
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
  nutritional_info: text(),
  allergen_info: text(),
  serving_suggestions: text(),
  storage_instructions: text(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  discount_percent: decimal({ precision: 5, scale: 2 }),
  image_urls: varchar({ length: 255 }).array().notNull(),
  stock_quantity: integer().notNull(),
  featured: boolean().notNull().default(false),
});

export const productRelations = relations(productsTable, ({ many }) => ({
  productReviews: many(productReviewsTable),
}));

export type ProductEntity = InferSelectModel<typeof productsTable> & {
  productReviews?: ProductReviewEntity[];
};

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

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "completed",
  "cancelled",
]);

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  paypal_id: varchar({ length: 50 }),
  user_id: integer().references(() => usersTable.id, {
    onDelete: "set null",
  }),
  guest_name: varchar({ length: 255 }),
  guest_email: varchar({ length: 255 }),
  status: orderStatusEnum().notNull().default("pending"),
  total_price: decimal({ precision: 10, scale: 2 }).notNull(),
  shipping_first_name: varchar({ length: 255 }).notNull(),
  shipping_last_name: varchar({ length: 255 }).notNull(),
  shipping_address: text().notNull(),
  shipping_city: varchar({ length: 100 }).notNull(),
  shipping_country_code: varchar({ length: 10 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const orderRelations = relations(ordersTable, ({ many }) => ({
  orderItems: many(orderItemsTable),
}));

export type OrderEntity = InferSelectModel<typeof ordersTable> & {
  orderItems?: OrderItemEntity[];
};

export const orderItemsTable = pgTable("order_items", {
  order_id: integer()
    .references(() => ordersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  product_id: varchar({ length: 50 })
    .references(() => productsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  quantity: integer().notNull(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  subtotal: decimal({ precision: 10, scale: 2 }).notNull(),
});

export const orderItemRelations = relations(orderItemsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderItemsTable.order_id],
    references: [ordersTable.id],
  }),
  product: one(productsTable, {
    fields: [orderItemsTable.product_id],
    references: [productsTable.id],
  }),
}));

export type OrderItemEntity = InferSelectModel<typeof orderItemsTable> & {
  product?: ProductEntity;
};

export const productReviewsTable = pgTable("product_reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  product_id: varchar({ length: 50 })
    .references(() => productsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  user_id: integer()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  // 1 - 5
  rating: integer().notNull(),
  comment: text(),
  created_at: timestamp().notNull().defaultNow(),
});

export const productReviewRelations = relations(
  productReviewsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productReviewsTable.product_id],
      references: [productsTable.id],
    }),
    user: one(usersTable, {
      fields: [productReviewsTable.user_id],
      references: [usersTable.id],
    }),
  }),
);

export type ProductReviewEntity = InferSelectModel<
  typeof productReviewsTable
> & {
  product?: ProductEntity;
  user?: Pick<UserEntity, "last_name" | "first_name">;
};
