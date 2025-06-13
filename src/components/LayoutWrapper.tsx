'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'sonner';
import CookieConsent from './CookieConsent';
import { AuthProvider } from '@/contexts/AuthContext';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Rotas onde Navbar e Footer não devem aparecer
    const hideNavbarFooter = pathname === '/login' || pathname === '/dashboard';

    return (
        <div className="flex flex-col min-h-screen">
            {!hideNavbarFooter && <Navbar />}
            {hideNavbarFooter && (<AuthProvider>
                <div className="flex-1 flex items-center justify-center">
                    <main className="flex-1">{children}</main>
                </div>
            </AuthProvider>)}
            <div className="flex-1 flex items-center justify-center">
                <main className="flex-1">{children}</main>
            </div>

            {!hideNavbarFooter && <CookieConsent />}
            <Toaster />
            {!hideNavbarFooter && <Footer />}
        </div>
    );
}