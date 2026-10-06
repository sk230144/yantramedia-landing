import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yantra Media — We Don’t Just Deliver Your Website, We Manage It",
  description: "Yantra Media designs, builds and manages professional websites, e-commerce stores, SEO and branding for growing businesses.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Red+Hat+Display:wght@300;400;600;700;800&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
