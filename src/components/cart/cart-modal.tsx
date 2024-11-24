"use client";

import { syncCart } from "@/lib/cart";
import { CartItem } from "@/types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useCart } from "./cart-context";

function CartItemCard({ item }: { item: CartItem }) {
  const { dispatch } = useCart();

  const totalPrice = Number(item.product.price) * item.quantity;

  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    let quantity = e.currentTarget.valueAsNumber;

    // if number is not valid, set it to 1
    if (!Number.isInteger(quantity) || quantity < 1) {
      e.currentTarget.value = "1";
      quantity = 1;
    }

    dispatch({
      type: "update",
      product: item.product,
      quantity,
    });
  };

  const onRemove = () => {
    dispatch({
      type: "remove",
      productId: item.product.id,
    });
  };

  return (
    <div className="flex items-start gap-4">
      <Image
        src={item.product.image_urls[0]}
        width={100}
        height={100}
        alt={item.product.name}
        className="object-cover w-24 h-24 rounded"
      />
      <div className="flex-1 flex flex-col">
        <p className="text-lg font-semibold">{item.product.name}</p>
        <p className="text-lg text-neutral-800 mb-2">
          ${totalPrice.toFixed(2)}
        </p>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Quantity:</span>
            <input
              type="number"
              className="w-12 h-8 text-lg rounded text-center bg-neutral-100"
              defaultValue={item.quantity}
              min={1}
              step={1}
              onChange={onChange}
            />
          </div>
          <button
            className="text-md underline text-neutral-800"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartModal() {
  const { cart, totalQuantities, totalPrice } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const router = useRouter();

  const gotoCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const quantityRef = useRef(totalQuantities);

  useEffect(() => {
    if (
      totalQuantities &&
      totalQuantities !== quantityRef.current &&
      totalQuantities > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = totalQuantities;
    }
  }, [isOpen, totalQuantities, quantityRef]);

  useEffect(() => {
    const doSyncCart = async () => {
      syncCart(cart);
    };
    doSyncCart();
  }, [cart]);

  return (
    <>
      <Button onClick={openCart} variant="secondary" aria-label="My Cart">
        <ShoppingCartIcon className="w-4 h-4" />
        <span className="hidden md:block">
          My Cart {cart.items.length ? `(${cart.items.length})` : ""}
        </span>
      </Button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black md:w-[420px]">
              <div className="flex items-center justify-between mb-8">
                <button aria-label="Close cart" onClick={closeCart}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-4 flex-1 min-h-0">
                <DialogTitle className="text-3xl font-semibold">
                  Your Items
                </DialogTitle>
                {!cart.items.length && (
                  <p className="text-lg text-neutral-500">
                    Your cart is empty.
                  </p>
                )}
                <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
                  {cart.items.map((item) => (
                    <CartItemCard key={item.product.id} item={item} />
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 pt-8 border-t">
                  <p className="text-lg font-semibold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                  <Link
                    href="/checkout"
                    onClick={gotoCheckout}
                    className={buttonVariants()}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
