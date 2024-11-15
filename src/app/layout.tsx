import { Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const font = Playfair_Display({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        {children}
        <Toaster />
        </body>
    </html>
  );
}
