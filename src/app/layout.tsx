import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SeniorModeProvider } from "@/components/providers/SeniorModeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-indic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ulbil.org"),
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
    icon: "/images/jubilee_125_logo.jpg",
    shortcut: "/favicon.ico",
    apple: "/images/jubilee_125_logo.jpg",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Library",
  "name": "Uluberia Institute & Library",
  "alternateName": "উলুবেড়িয়া ইনস্টিটিউট ও লাইব্রেরি",
  "url": "https://ulbil.org",
  "logo": "https://www.ulbil.org/images/Logo/logo_digital.png",
  "foundingDate": "1902",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Institute Road, Uluberia",
    "addressLocality": "Howrah",
    "addressRegion": "West Bengal",
    "postalCode": "711315",
    "addressCountry": "IN"
  },
  "telephone": "+91-9836330911",
  "email": "ulu.ins.library@ulbil.org",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "12:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "16:00",
      "closes": "19:00"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable} ${notoSerifBengali.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF7F0] text-[#2C2420] antialiased selection:bg-[#FEF0EA] selection:text-[#D95D24]">
        <SeniorModeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SeniorModeProvider>
      </body>
    </html>
  );
}
