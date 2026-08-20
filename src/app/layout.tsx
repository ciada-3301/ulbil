import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Uluberia Institute & Library | 125th Quasquicentennial Jubilee (1902–2027)",
    template: "%s | Uluberia Institute & Library"
  },
  description: "Official portal of Uluberia Institute & Library (Estd. 1902). Celebrating 125 glorious years of literature, Bengal heritage, public education, and community impact in Howrah.",
  keywords: [
    "Uluberia Institute and Library",
    "Uluberia Library",
    "ulbil.org",
    "Uluberia 125th Anniversary",
    "Public Library Howrah",
    "Rare Manuscripts Bengal",
    "Uluberia College Foundation",
    "Satta Magazine"
  ],
  authors: [{ name: "Uluberia Institute & Library" }],
  icons: {
    icon: "https://www.ulbil.org/images/Logo/logo_digital.png",
    shortcut: "https://www.ulbil.org/images/Logo/logo_digital.png",
    apple: "https://www.ulbil.org/images/Logo/logo_digital.png",
  },
  openGraph: {
    title: "Uluberia Institute & Library (Estd. 1902) — 125th Anniversary",
    description: "A century and a quarter of public service, literacy, and culture. Explore our catalogue, rare archives, and anniversary programs.",
    url: "https://ulbil.org",
    siteName: "Uluberia Institute & Library",
    images: [
      {
        url: "https://www.ulbil.org/images/Logo/logo_digital.png",
        width: 600,
        height: 800,
        alt: "Uluberia Institute & Library Logo"
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FCFBF7] text-[#221F1E] antialiased selection:bg-[#FEF0EA] selection:text-[#D95D24]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

