'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ScrollProgressBar from './ScrollProgressBar';
import { Toaster } from 'sonner';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollProgressBar />
            <Navbar />

            <div className="flex-1 flex items-center justify-center min-w-0">
                <main className="flex-1 w-full min-w-0">{children}</main>
            </div>

            <Toaster />
            <Footer />
            <CookieBanner />
        </div>
    );
}
