import type { Metadata } from "next";
import { Cantarell } from "next/font/google";
import "./globals.scss";

const cantarell = Cantarell({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Vinay Viswanathan — Photography & Videography",
  description:
    "Seattle based photographer and videographer capturing authentic experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cantarell.className}>
      <body>{children}</body>
    </html>
  );
}
