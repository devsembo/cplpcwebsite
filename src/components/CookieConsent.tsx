'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        functional: false,
        analytics: false,
        advertising: false,
        social: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        } else {
            try {
                const parsed = JSON.parse(consent);
                setPreferences(parsed);
            } catch (err) {
                console.warn('Consentimento inválido. Resetando.', err);
                localStorage.removeItem('cookieConsent');
                setIsVisible(true);
            }
        }
    }, []);

    const savePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setIsVisible(false);
    };

    const acceptAll = () => {
        const all = {
            essential: true,
            functional: true,
            analytics: true,
            advertising: true,
            social: true,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(all));
        setPreferences(all);
        setIsVisible(false);
    };

    const rejectNonEssential = () => {
        const minimal = {
            essential: true,
            functional: false,
            analytics: false,
            advertising: false,
            social: false,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(minimal));
        setPreferences(minimal);
        setIsVisible(false);
    };

    const handlePreferenceChange = (key: keyof typeof preferences) => {
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white border-t border-gray-300 shadow-md">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-700 text-sm flex-1">
                    Este site usa cookies para melhorar a sua experiência.
                    <Button
                        variant="link"
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-blue-600 underline ml-1 p-0 h-auto hover:cursor-pointer"
                    >
                        Preferências
                    </Button>
                    {' | '}
                    <Link
                        href="/politica-privacidade"
                        className="text-blue-600 underline hover:cursor-pointer"
                    >
                        Política de Cookies
                    </Link>
                </div>

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={acceptAll} className="text-sm hover:cursor-pointer">
                        Aceitar Todos
                    </Button>
                    <Button variant="outline" onClick={rejectNonEssential} className="text-sm hover:cursor-pointer">
                        Rejeitar
                    </Button>
                    {showSettings && (
                        <Button onClick={savePreferences} className="bg-green-600 text-white hover:bg-green-700 text-sm hover:cursor-pointer">
                            Salvar
                        </Button>
                    )}
                </div>
            </div>

            {showSettings && (
                <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600 space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="essential" checked disabled />
                        <Label htmlFor="essential">
                            <strong>Essenciais:</strong> Necessários para o funcionamento do site.
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="functional"
                            checked={preferences.functional}
                            onCheckedChange={() => handlePreferenceChange('functional')}
                        />
                        <Label htmlFor="functional">
                            Funcionais: Guardam preferências como idioma.
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="analytics"
                            checked={preferences.analytics}
                            onCheckedChange={() => handlePreferenceChange('analytics')}
                        />
                        <Label htmlFor="analytics">
                            Analíticos: Melhoram o desempenho e análise do site.
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="advertising"
                            checked={preferences.advertising}
                            onCheckedChange={() => handlePreferenceChange('advertising')}
                        />
                        <Label htmlFor="advertising">
                            Publicidade: Mostram anúncios relevantes.
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="social"
                            checked={preferences.social}
                            onCheckedChange={() => handlePreferenceChange('social')}
                        />
                        <Label htmlFor="social">
                            Mídias Sociais: Integração com redes sociais.
                        </Label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieConsent;
