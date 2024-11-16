import { Metadata } from "next";
import { CheckoutPageContent } from "./page-content";

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}

export const metadata: Metadata = {
  title: "Checkout",
  robots: "noindex",
};
