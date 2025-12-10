import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AnimatedBackground from '@/components/AnimatedBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPLP CONNECT - A ponte entre cidadãos e serviços consulares",
  description:
    "A CPLP CONNECT facilita o acesso a consulados e serviços públicos dos países da CPLP, com agendamentos online, informações consulares e suporte em tempo real.",
  keywords: [
    "CPLP",
    "CPLP CONNECT",
    "consulado",
    "serviços consulares",
    "agendamento online",
    "imigração",
    "AIMA",
    "países lusófonos",
    "atendimento cidadão",
  ],
  authors: [{ name: "CPLP CONNECT", url: "https://cplpconnect.pt" }],
  creator: "CPLP CONNECT",
  openGraph: {
    title: "CPLP CONNECT",
    description:
      "A ponte digital entre cidadãos e serviços consulares da CPLP.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <AnimatedBackground />
        <LayoutWrapper>
          <LanguageProvider>
            <div className="flex-1">
              {children}
            </div>
          </LanguageProvider>
        </LayoutWrapper>
      </body>
    </html>
  );
}