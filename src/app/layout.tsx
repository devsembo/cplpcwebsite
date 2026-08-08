import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/brand-tokens.css";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP",
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
  authors: [{ name: "CPLP CONNECT", url: "https://cplpconnect.pt" }],
  creator: "CPLP CONNECT",
  manifest: "/site.webmanifest",
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
    url: "https://cplpconnect.pt",
    siteName: "CPLP CONNECT",
    images: [
      {
        // TODO: substituir por um cartão social dedicado 1200x630.
        url: "https://cplpconnect.pt/brand/png/cplpconnect-lockup-h.png",
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
    images: ["https://cplpconnect.pt/brand/png/cplpconnect-lockup-h.png"],
  },
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
        <LanguageProvider>
          <LayoutWrapper>
            <div className="flex-1">
              {children}
            </div>
          </LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}