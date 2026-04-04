import type { Metadata } from "next";
import { Bebas_Neue, Share_Tech_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "700"],
  variable: "--font-barlow",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FORENSIC AI | Medico-Legal Analysis System",
  description: "Automated Medico-Legal Analysis System for Educational Purposes Only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${shareTechMono.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
