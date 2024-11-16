import { CartProvider } from "@/components/cart/cart-context";
import { ChatProvider } from "@/components/chat";
import { ChatModal } from "@/components/chat/chat-modal";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SessionProvider } from "@/components/session";
import { getSession } from "@/lib/session";
import { Metadata } from "next";
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
          <CartProvider initialSession={session}>
            <ChatProvider>
              <Navbar />
              {children}
              <Footer />
              <ChatModal />
            </ChatProvider>
          </CartProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "AI Oven",
};
