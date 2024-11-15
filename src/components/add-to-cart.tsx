"use client";

import { Product } from "@/types";
import { useRef } from "react";
import { toast } from "sonner";
import { useCart } from "./cart";
import { Button } from "./ui/button";

export function AddToCart({ product }: { product: Product }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { cart, dispatch } = useCart();

  const addToCart = () => {
    const quantity = inputRef.current?.valueAsNumber;
    if (!quantity) {
      toast.error("Please enter a quantity");
    }
    dispatch({ type: "add", product, quantity: quantity || 1 });
  };

  const onBlur = () => {
    if (!inputRef.current) return;
    // check if input is a valid round number or else set it to 1
    const quantity = inputRef.current?.valueAsNumber;
    if (!Number.isInteger(quantity)) {
      inputRef.current.value = "1";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="number"
        className="w-20 h-10 text-center border border-neutral-300 rounded"
        defaultValue={1}
        min={1}
        step={1}
        onBlur={onBlur}
      />
      <Button onClick={addToCart}>Add to Cart</Button>
    </div>
  );
}
