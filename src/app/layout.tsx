import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CPLP CONNECT — Consultoria Tecnológica e Transformação Digital no Espaço CPLP",
  description:
    "Consultoria tecnológica sediada no Porto que desenha e desenvolve software, apps e plataformas digitais para empresas e instituições dos países de língua portuguesa (Portugal, Angola e restante CPLP).",
  keywords: [
    "CPLP",
    "CPLP CONNECT",
    "consultoria tecnológica",
    "transformação digital",
    "desenvolvimento de software",
    "desenvolvimento de apps",
    "Porto",
    "Portugal",
    "Angola",
    "países lusófonos",
  ],
  authors: [{ name: "CPLP CONNECT", url: "https://cplpconnect.pt" }],
  creator: "CPLP CONNECT",
  openGraph: {
    title: "CPLP CONNECT — Consultoria Tecnológica e Transformação Digital no Espaço CPLP",
    description:
      "Desenhamos e desenvolvemos software, apps e plataformas digitais para empresas e instituições do espaço CPLP.",
    url: "https://cplpconnect.pt",
    siteName: "CPLP CONNECT",
    images: [
      {
        url: "https://cplpconnect.pt/cplp-logo.png",
        width: 1200,
        height: 630,
        alt: "CPLP CONNECT",
      },
    ],
    locale: "pt_PT",
    type: "website",
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
        <AnimatedBackground />
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