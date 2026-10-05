import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yantramedia — Branding & Digital Agency",
  description: "Yantramedia creates distinctive brand identities, digital experiences and campaigns built to be remembered.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
