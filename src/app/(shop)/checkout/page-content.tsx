"use client";

import { useCart } from "@/components/cart";
import { CountrySelect } from "@/components/country-select";
import { useSession } from "@/components/session";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, getCartItemCost, getCartTotalCost } from "@/lib/utils";
import { CartItem, Order } from "@/types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";
import { CompleteScreen } from "./complete-screen";
import { PaymentForm } from "./payment-form";

function CartItemCard({ item }: { item: CartItem }) {
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

function ContactForm() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Contact</h2>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="guest_email"
          required
        />
      </div>
      <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700 text-sm">
        <p>
          You are checking out as a guest.{" "}
          <Link
            href={`/login?next=${encodeURIComponent("/checkout")}`}
            className="underline text-teal-700"
          >
            Create an account
          </Link>{" "}
          to save your details for future purchases.
        </p>
      </div>
    </div>
  );
}

function DeliveryForm({
  formRef,
}: {
  formRef: RefObject<HTMLFormElement | null>;
}) {
  const session = useSession();

  const onUseAccountDetails = () => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    if (!session.user) {
      return;
    }
    (form.elements.namedItem("shipping_first_name") as HTMLInputElement).value =
      session.user.first_name;
    (form.elements.namedItem("shipping_last_name") as HTMLInputElement).value =
      session.user.last_name;
    if (session.user.address) {
      (form.elements.namedItem("shipping_address") as HTMLInputElement).value =
        session.user.address;
    }
    if (session.user.city) {
      (form.elements.namedItem("shipping_city") as HTMLInputElement).value =
        session.user.city;
    }
    if (session.user.country_code) {
      (
        form.elements.namedItem("shipping_country_code") as HTMLSelectElement
      ).value = session.user.country_code;
    }
    if (session.user.phone_number) {
      (
        form.elements.namedItem("shipping_phone_number") as HTMLInputElement
      ).value = session.user.phone_number;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-medium flex-1 min-w-0">Delivery</h2>
        {session.user && (
          <button
            className="text-sm text-gray-700 hover:underline flex-none"
            onClick={onUseAccountDetails}
            type="button"
          >
            Use my account details
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Input
            type="text"
            placeholder="First Name"
            autoComplete="given-name"
            name="shipping_first_name"
            className="flex-1 min-w-0"
            defaultValue={session.user?.first_name || undefined}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            autoComplete="family-name"
            name="shipping_last_name"
            className="flex-1 min-w-0"
            defaultValue={session.user?.last_name || undefined}
            required
          />
        </div>
        <Input
          type="text"
          placeholder="Address"
          autoComplete="street-address"
          name="shipping_address"
          defaultValue={session.user?.address || undefined}
          required
        />
        <Input
          type="text"
          placeholder="City"
          autoComplete="address-level2"
          name="shipping_city"
          defaultValue={session.user?.city || undefined}
          required
        />
        <CountrySelect
          name="shipping_country_code"
          defaultValue={session.user?.country_code || "VN"}
          required
        />
        <Input
          placeholder="Phone"
          type="tel"
          name="shipping_phone_number"
          defaultValue={session.user?.phone_number || undefined}
          required
        />
      </div>
    </div>
  );
}

const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.PAYPAL_CLIENT_ID!,
  currency: "USD",
  components: "buttons",
  disableFunding: "paylater",
};

export function CheckoutPageContent() {
  const session = useSession();
  const { cart, dispatch } = useCart();

  const [showPayment, setShowPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowPayment(true);
  };

  if (completedOrder) {
    return <CompleteScreen order={completedOrder} />;
  }

  if (!cart.items.length) {
    return (
      <div className="container py-12 text-center flex flex-col items-center">
        <h1 className="text-3xl font-medium mb-8">Your cart is empty</h1>
        <Link href="/products" className={buttonVariants({ size: "lg" })}>
          Browse Products
        </Link>
      </div>
    );
  }

  const onComplete = (order: Order) => {
    dispatch({ type: "clear" });
    setCompletedOrder(order);
  };

  const totalCost = getCartTotalCost(cart);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="container py-12 grid gap-8 grid-cols-1 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-medium mb-4">Checkout</h1>
          <form
            ref={formRef}
            className={cn("flex flex-col gap-8", showPayment && "hidden")}
            onSubmit={onSubmit}
          >
            {!session.user && <ContactForm />}
            <DeliveryForm formRef={formRef} />
            <Button type="submit" className={buttonVariants({ size: "lg" })}>
              <span className="flex-1 text-left">Place Order</span>
              <ArrowRightIcon className="h-6 w-6" />
            </Button>
          </form>
          {showPayment && (
            <>
              <PaymentForm formRef={formRef} onCompleted={onComplete} />
              <Button variant="secondary" onClick={() => setShowPayment(false)}>
                Go Back
              </Button>
            </>
          )}
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4">Your order</h2>
          <div className="flex flex-col gap-4 mb-12 w-full">
            {cart.items.map((item) => (
              <CartItemCard key={item.product.id} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-neutral-200 py-4">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xl font-semibold">
              ${totalCost.totalCost}
              {Number(totalCost.saving) > 0 && (
                <span className="text-neutral-500">
                  {" "}
                  (Saved ${totalCost.saving})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
