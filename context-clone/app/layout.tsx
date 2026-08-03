import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebContext — Web Context API clone",
  description:
    "Minimal Context.dev clone: scrape URLs to Markdown and extract structured JSON with a schema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
