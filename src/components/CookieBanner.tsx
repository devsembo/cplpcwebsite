'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'cplp_cookie_consent';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = window.localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do localStorage no cliente, sem alternativa sem efeito para evitar mismatch de hidratação
            setVisible(true);
        }
    }, []);

    const accept = () => {
        window.localStorage.setItem(CONSENT_KEY, 'accepted');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6">
            <div className="max-w-3xl mx-auto bg-cplp-navy text-white rounded-lg shadow-card-hover border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Cookie className="h-6 w-6 text-cplp-green shrink-0" />
                <p className="text-sm text-white/80 leading-relaxed flex-1">
                    Este site utiliza apenas cookies estritamente necessários ao seu
                    funcionamento — não usamos cookies de analítica ou publicidade. Saiba
                    mais na nossa{' '}
                    <Link href="/politica-cookies" className="underline underline-offset-2 hover:text-white">
                        Política de Cookies
                    </Link>
                    .
                </p>
                <Button
                    onClick={accept}
                    size="sm"
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md shrink-0 w-full sm:w-auto"
                >
                    Entendi
                </Button>
            </div>
        </div>
    );
}
