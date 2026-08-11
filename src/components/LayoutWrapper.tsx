'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { Toaster } from 'sonner';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-1 flex items-center justify-center">
                <main className="flex-1">{children}</main>
            </div>

            <Toaster />
            <Footer />
            <CookieBanner />
        </div>
    );
}
