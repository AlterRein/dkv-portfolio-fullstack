import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio DKV — Visual Communication Designer",
  description:
    "Portfolio Desain Komunikasi Visual — Brand Identity, Illustration, Typography, Motion Graphics. Kreativitas tanpa batas.",
  keywords: [
    "DKV",
    "Desain Komunikasi Visual",
    "Portfolio",
    "Brand Identity",
    "Graphic Design",
    "Motion Graphics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
