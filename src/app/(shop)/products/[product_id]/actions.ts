"use server";

import { db } from "@/db";
import { productReviewsTable, productsTable } from "@/db/schema";
import rateLimit from "@/lib/rate-limit";
import { getSession } from "@/lib/session";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  product_id: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().optional(),
});

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function createReviews(formData: FormData) {
  // allows 5 requests per minute
  await limiter.check(5);

  const session = await getSession();
  if (!session.user) {
    throw new Error("Unauthorized");
  }

  const data = schema.parse(formData);

  const product = await db.query.productsTable.findFirst({
    where: eq(productsTable.id, data.product_id),
  });
  if (!product) {
    throw new Error("Product not found");
  }

  await db.insert(productReviewsTable).values({
    product_id: data.product_id,
    rating: data.rating,
    comment: data.comment,
    user_id: session.user.id,
  });

  revalidatePath(`/products/${data.product_id}`);
}

export async function deleteReview(id: number) {
  const session = await getSession();
  if (!session.user) {
    throw new Error("Unauthorized");
  }

  const [review] = await db
    .delete(productReviewsTable)
    .where(
      and(
        eq(productReviewsTable.id, id),
        eq(productReviewsTable.user_id, session.user.id),
      ),
    )
    .returning();

  if (!review) {
    throw new Error("Review not found");
  }

  revalidatePath(`/products/${review.product_id}`);
}
