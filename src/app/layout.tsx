import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/brand-tokens.css";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://cplpconnect.pt";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1533",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP",
    template: "%s — CPLP CONNECT",
  },
  description:
    "Consultora sediada no Porto que concebe e implementa plataformas digitais, software e programas de capacitação para empresas e instituições dos países de língua portuguesa (Portugal, Angola e restante CPLP).",
  keywords: [
    "CPLP",
    "CPLP CONNECT",
    "consultoria",
    "transformação digital",
    "plataformas digitais",
    "software institucional",
    "formação corporativa",
    "Porto",
    "Portugal",
    "Angola",
    "países lusófonos",
  ],
  authors: [{ name: "CPLP CONNECT", url: SITE_URL }],
  creator: "CPLP CONNECT",
  publisher: "CPLP CONNECT",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP",
    description:
      "Concebemos e implementamos plataformas digitais, software e programas de capacitação para empresas e instituições do espaço CPLP.",
    url: SITE_URL,
    siteName: "CPLP CONNECT",
    images: [
      {
        // TODO: substituir por um cartão social dedicado 1200x630.
        url: "/brand/png/cplpconnect-lockup-h.png",
        width: 3120,
        height: 1080,
        alt: "CPLP CONNECT",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP",
    description:
      "Concebemos e implementamos plataformas digitais, software e programas de capacitação para empresas e instituições do espaço CPLP.",
    images: ["/brand/png/cplpconnect-lockup-h.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_INFO.legalName,
  legalName: COMPANY_INFO.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/png/cplpconnect-lockup-h.png`,
  description:
    "Consultora tecnológica sediada no Porto, dedicada à transformação digital de empresas e instituições do espaço CPLP.",
  email: COMPANY_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto",
    addressCountry: "PT",
  },
  sameAs: [
    "https://www.instagram.com/cplpconnect/",
    "https://www.linkedin.com/company/cplp-connect/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}