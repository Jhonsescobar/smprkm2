import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMP Swasta RK Makmur / Budi Murni-4",
  description:
    "Halaman hitung mundur resmi untuk berbagai kegiatan dan acara penting SMP Swasta RK Makmur / Budi Murni-4.",

  keywords: [
    "Countdown Sekolah",
    "SMP Swasta RK Makmur",
    "Budi Murni-4",
    "Acara Sekolah",
    "Pengumuman",
    "Kegiatan Siswa"
  ],

  authors: [
    {
      name: "Tim IT SMP Swasta RK Makmur / Budi Murni-4",
    },
  ],

  openGraph: {
    title: "SMP Swasta RK Makmur / BudiMurni-4",
    description:
      "Pantau hitung mundur menuju kegiatan dan acara penting sekolah secara real-time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
