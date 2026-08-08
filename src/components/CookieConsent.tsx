'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, Settings2, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
}

const COOKIE_DESCRIPTIONS: Record<keyof CookiePreferences, { label: string; description: string; icon: React.ElementType }> = {
    essential: {
        label: 'Essenciais',
        description: 'Necessários para o funcionamento do site, segurança e navegação. Não podem ser desativados.',
        icon: Shield,
    },
    functional: {
        label: 'Funcionais',
        description: 'Guardam as suas preferências como idioma e dados de formulários para melhorar a experiência.',
        icon: Settings2,
    },
    analytics: {
        label: 'Analíticos',
        description: 'Ajudam-nos a compreender como os visitantes utilizam o site, permitindo melhorias contínuas.',
        icon: BarChart3,
    },
};

const DEFAULT_PREFERENCES: CookiePreferences = {
    essential: true,
    functional: false,
    analytics: false,
};

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(timer);
        }
        try {
            const parsed = JSON.parse(consent) as CookiePreferences;
            if (typeof parsed.essential === 'boolean') {
                setPreferences(parsed);
            } else {
                throw new Error('Invalid format');
            }
        } catch {
            localStorage.removeItem('cookieConsent');
            setIsVisible(true);
        }
    }, []);

    const applyConsent = (prefs: CookiePreferences) => {
        localStorage.setItem('cookieConsent', JSON.stringify(prefs));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        setPreferences(prefs);
        setIsVisible(false);
    };

    const acceptAll = () => applyConsent({ essential: true, functional: true, analytics: true });
    const rejectNonEssential = () => applyConsent({ essential: true, functional: false, analytics: false });
    const savePreferences = () => applyConsent(preferences);

    const handleToggle = (key: keyof CookiePreferences) => {
        if (key === 'essential') return;
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="mx-4 mb-4 md:mx-8 md:mb-6 max-w-2xl md:ml-auto">
                <div className="bg-white border border-cplp-line rounded-lg shadow-card-hover overflow-hidden">

                    {/* Header */}
                    <div className="p-5 pb-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-9 w-9 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center">
                                <Cookie className="h-4 w-4 text-cplp-blue" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-cplp-navy">Preferências de Cookies</h3>
                                <p className="text-xs text-cplp-grey">CPLP CONNECT respeita a sua privacidade</p>
                            </div>
                        </div>
                        <p className="text-xs text-cplp-grey leading-relaxed">
                            Utilizamos cookies para garantir o funcionamento do site e melhorar a sua experiência.
                            Consulte a nossa{' '}
                            <Link href="/politica-privacidade" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2 transition-colors">
                                Política de Privacidade
                            </Link>{' '}
                            para mais detalhes.
                        </p>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className="px-5 pb-2 space-y-3 border-t border-cplp-line pt-4">
                            {(Object.keys(COOKIE_DESCRIPTIONS) as Array<keyof CookiePreferences>).map((key) => {
                                const { label, description, icon: Icon } = COOKIE_DESCRIPTIONS[key];
                                const isEssential = key === 'essential';
                                return (
                                    <div key={key} className="flex items-start gap-3 py-2">
                                        <div className="h-8 w-8 rounded-md bg-cplp-bg flex items-center justify-center shrink-0 border border-cplp-line">
                                            <Icon className="h-4 w-4 text-cplp-blue" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <Label htmlFor={key} className="text-sm font-medium text-cplp-navy cursor-pointer">
                                                    {label}
                                                    {isEssential && <span className="ml-1.5 text-[10px] text-cplp-grey font-normal">(sempre ativo)</span>}
                                                </Label>
                                                <Switch
                                                    id={key}
                                                    checked={preferences[key]}
                                                    onCheckedChange={() => handleToggle(key)}
                                                    disabled={isEssential}
                                                    className="data-[state=checked]:bg-cplp-blue shrink-0"
                                                />
                                            </div>
                                            <p className="text-[11px] text-cplp-grey leading-relaxed mt-0.5">{description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 pt-2 flex flex-col gap-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="flex items-center justify-center gap-1 text-xs text-cplp-grey hover:text-cplp-navy transition-colors py-1 cursor-pointer"
                        >
                            {showSettings ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                            {showSettings ? 'Ocultar preferências' : 'Personalizar preferências'}
                        </button>
                        <div className="flex gap-2">
                            <Button
                                onClick={rejectNonEssential}
                                variant="outline"
                                className="flex-1 text-xs h-9 border-cplp-line text-cplp-navy hover:bg-cplp-bg rounded-md cursor-pointer"
                            >
                                Apenas Essenciais
                            </Button>
                            {showSettings ? (
                                <Button
                                    onClick={savePreferences}
                                    className="flex-1 text-xs h-9 bg-cplp-blue hover:bg-cplp-blue-hover text-white font-semibold rounded-md cursor-pointer"
                                >
                                    Guardar Preferências
                                </Button>
                            ) : (
                                <Button
                                    onClick={acceptAll}
                                    className="flex-1 text-xs h-9 bg-cplp-blue hover:bg-cplp-blue-hover text-white font-semibold rounded-md cursor-pointer"
                                >
                                    Aceitar Todos
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
