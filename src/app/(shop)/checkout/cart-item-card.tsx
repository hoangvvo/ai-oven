import { getCartItemCost } from "@/lib/utils";
import { CartItem } from "@/types";
import Image from "next/image";

export function CartItemCard({ item }: { item: CartItem }) {
  const itemPrice = getCartItemCost(item);

  return (
    <div className="flex items-start gap-4">
      <Image
        src={item.product.image_urls[0]}
        width={64}
        height={64}
        alt={item.product.name}
        className="object-cover w-16 h-16 rounded"
      />
      <div className="flex-1 flex flex-col">
        <p className="text-lg font-semibold">{item.product.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">Quantity:</span>
          <span className="text-neutral-700 font-semibold">
            {item.quantity}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-lg text-neutral-800">
          {itemPrice.cost === itemPrice.originalCost ? (
            <>${itemPrice.cost}</>
          ) : (
            <>
              <span className="line-through text-neutral-500">
                ${itemPrice.originalCost}
              </span>{" "}
              ${itemPrice.cost}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
