import { CartProvider } from "@/components/cart/cart-context";
import { SessionProvider } from "@/components/session";
import { getSession } from "@/lib/session";
import { Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const font = Playfair_Display({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <SessionProvider session={session}>
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
