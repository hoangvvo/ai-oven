"use client";

import { CartItem, useCart } from "@/components/cart";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import Image from "next/image";
import Link from "next/link";

function CartItemCard({ item }: { item: CartItem }) {
  const totalPrice = Number(item.product.price) * item.quantity;

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
        <p className="text-lg text-neutral-800">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Contact</h2>
      <div className="flex flex-col gap-2">
        <Input type="email" placeholder="Email" autoComplete="email" />
      </div>
    </div>
  );
}

function DeliveryForm() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Delivery</h2>
      <div className="flex flex-col gap-2">
        <Input type="text" placeholder="Name" autoComplete="name" />
        <Input
          type="text"
          placeholder="Address"
          autoComplete="street-address"
        />
        <Input type="text" placeholder="City" autoComplete="address-level2" />
        <Input type="text" placeholder="Country" autoComplete="country-name" />
        <Input placeholder="Phone" type="tel" />
      </div>
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Payment</h2>
      <PayPalButtons
        style={{
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        }}
      />
    </div>
  );
}

function CheckoutPageContent() {
  const { cart } = useCart();

  return (
    <div className="container py-12 flex gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-medium mb-4">Checkout</h1>
        <div className="flex flex-col gap-8">
          <ContactForm />
          <DeliveryForm />
          <PaymentForm />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4 mb-12 w-full">
          {cart.items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>
        <div className="flex justify-between items-center border-t border-neutral-200 py-4">
          <p className="text-xl font-semibold">Total</p>
          <p className="text-xl font-semibold">
            $
            {cart.items
              .reduce((total, item) => {
                return total + Number(item.product.price) * item.quantity;
              }, 0)
              .toFixed(2)}
          </p>
        </div>
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

export default function CheckoutPage() {
  const { cart } = useCart();

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

  return (
    <PayPalScriptProvider options={initialOptions}>
      <CheckoutPageContent />
    </PayPalScriptProvider>
  );
}
