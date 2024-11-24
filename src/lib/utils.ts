import { Cart, CartItem, Product } from "@/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends () => unknown>(fn: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(), delay);
  };
}

export function getProductCost(product: Product) {
  const price = (
    Number(product.price) *
    (100 - Number(product.discount_percent)) *
    0.01
  ).toFixed(2);
  const originalPrice = product.price;
  return { price, originalPrice };
}

export function getCartItemCost(item: CartItem) {
  const productCost = getProductCost(item.product);

  return {
    cost: (Number(productCost.price) * item.quantity).toFixed(2),
    originalCost: (Number(productCost.originalPrice) * item.quantity).toFixed(
      2,
    ),
  };
}

export function getCartTotalCost(cart: Cart) {
  const totalCost = cart.items
    .reduce((total, item) => total + Number(getCartItemCost(item).cost), 0)
    .toFixed(2);

  const originalTotalCost = cart.items
    .reduce(
      (total, item) => total + Number(getCartItemCost(item).originalCost),
      0,
    )
    .toFixed(2);

  const saving = (Number(originalTotalCost) - Number(totalCost)).toFixed(2);

  return { totalCost, originalTotalCost, saving };
}
