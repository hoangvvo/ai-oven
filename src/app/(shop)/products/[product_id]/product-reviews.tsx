"use client";

import { useSession } from "@/components/session";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product, ProductReview } from "@/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { createReviews, deleteReview } from "./actions";

function ProductReviewForm({ product }: { product: Product }) {
  const [rating, setRating] = useState(5);

  const { pending } = useFormStatus();

  const session = useSession();
  if (!session.user) {
    return (
      <div className="bg-neutral-100 p-4 rounded flex items-center flex-wrap gap-4 justify-between">
        Login to write a review
        <Link
          href={`/login?next=${encodeURIComponent(`/products/${product.id}`)}`}
          className={buttonVariants({
            size: "sm",
          })}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-2" action={createReviews}>
      <textarea
        className="w-full p-2 bg-gray-100 focus-visible:bg-gray-50 rounded min-h-28 [field-sizing:content] disabled:bg-gray-200"
        placeholder="Write a review"
        rows={3}
        disabled={pending}
        required
        name="comment"
      />
      <input type="hidden" name="product_id" value={product.id} />
      <input type="hidden" name="rating" value={rating} />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star}`}
              disabled={pending}
            >
              <StarIcon className="w-6 h-6" />
            </button>
          ))}
        </div>
        <Button type="submit" disabled={pending}>
          Submit
        </Button>
      </div>
    </form>
  );
}

function ProductReviewCard({ review }: { review: ProductReview }) {
  const session = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteReview(review.id);
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-neutral-50">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-lg font-medium">
            {review.user?.first_name || review.user_id}
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(review.created_at), "MMMM d, yyyy")}
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-base w-full">{review.comment}</p>
      {session.user?.id === review.user_id && (
        <button
          className="text-sm text-gray-600 self-start underline"
          onClick={onDelete}
          disabled={isDeleting}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export function ProductReviewSection({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2 py-4 border-t">
      <h2 className="text-xl md:text-2xl font-medium mb-2">Reviews</h2>
      <ProductReviewForm product={product} />
      <div className="flex flex-col gap-4 mt-2">
        {!product.productReviews?.length ? (
          <p className="text-lg text-gray-600 italic">No reviews yet</p>
        ) : (
          product.productReviews.map((review) => (
            <ProductReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}
