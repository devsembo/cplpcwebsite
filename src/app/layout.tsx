import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";

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
        url: "https://cplpconnect.pt/cplp-logo.png", // substitui se já tiver imagem
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
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CookieConsent />
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
