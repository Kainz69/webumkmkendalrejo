import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMKM Desa Kendalrejo – Pusat Informasi & Promosi Digital",
  description:
    "Temukan produk dan jasa unggulan dari UMKM Desa Kendalrejo, Kecamatan Talun, Blitar. Direktori digital resmi yang menampilkan katalog, lokasi, dan informasi lengkap usaha warga desa.",
  keywords: [
    "UMKM",
    "Desa Kendalrejo",
    "Blitar",
    "kuliner",
    "kerajinan",
    "produk lokal",
  ],
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#3a7d44",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className={`${inter.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
