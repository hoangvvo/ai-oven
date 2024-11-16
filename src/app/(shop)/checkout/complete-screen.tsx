import imageChefBaking from "@/assets/images/swedish-chef-baking.gif";
import { buttonVariants } from "@/components/ui/button";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const CompleteScreen: FC<{
  order: Order;
}> = ({ order }) => {
  return (
    <div className="container flex flex-col items-center justify-center h-full py-36">
      <Image
        src={imageChefBaking}
        alt="Chef baking"
        width={192}
        height={192}
        className="w-48 h-48 object-cover rounded mb-8"
      />
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Your Order is Freshly Baked!
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-xl text-center">
        Thank you for placing your order with AI Oven! We’ve whisked up
        something special, and your treats are on their way.
      </p>
      <div className="flex gap-4">
        <Link
          href="/products"
          className={buttonVariants({ variant: "secondary" })}
        >
          Continue Shopping
        </Link>
        <Link href={`/orders/${order.id}`} className={buttonVariants()}>
          View Order
        </Link>
      </div>
    </div>
  );
};
