'use client';

import React, { createContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type AuthContextData = {
    admin: AdminProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignInProps) => Promise<void>;
    setAdmin: (admin: AdminProps) => void;
};

type AdminProps = {
    id: string;
    nome: string;
    email: string;
};

type SignInProps = {
    email: string;
    password: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [admin, setAdmin] = useState<AdminProps | null>(null);
    const router = useRouter();
    const isAuthenticated = !!admin;

    const signOut = useCallback(() => {
        destroyCookie(undefined, '@admincplpconnect.token');
        localStorage.removeItem('admin');
        setAdmin(null);
        delete api.defaults.headers['Authorization'];
        router.push('/login');
    }, [router]);

    const signIn = useCallback(
        async ({ email, password }: SignInProps) => {
            try {
                const response = await api.post('/api/sign', { email, password });
                const { token, nome, id, email: adminEmail } = response.data;

                setCookie(undefined, '@admincplpconnect.token', token, {
                    maxAge: 60 * 60 * 24 * 7, // 7 dias
                    path: '/',
                    sameSite: 'strict',
                });

                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                setAdmin({ id, nome, email: adminEmail });
                localStorage.setItem('admin', JSON.stringify({ id, nome, email: adminEmail }));

                router.push('/dashboard');
            } catch (err) {
                console.error('Erro no login:', err);
                toast.error('Email ou senha incorretos.');
                throw err; // Rejoga o erro para o chamador
            }
        },
        [router]
    );

    const signUp = useCallback(async ({ email, password }: SignInProps) => {
        try {
            await api.post('/admin/register', { email, password });
            toast.success('Cadastro realizado com sucesso! Faça login.');
            router.push('/login');
        } catch (err) {
            console.error('Erro no cadastro:', err);
            toast.error('Erro ao cadastrar. Tente novamente.');
            throw err;
        }
    }, [router]);

    useEffect(() => {
        const { '@admincplpconnect.token': token } = parseCookies();

        if (token) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            if (!admin) {
                api.get('/api/admin/me')
                    .then((response) => {
                        const { id, nome, email } = response.data;
                        setAdmin({ id, nome, email });
                    })
                    .catch(() => {
                        signOut();
                    });
            }
        } else if (!admin) {
            signOut();
        }
    }, [admin, signOut]);

    return (
        <AuthContext.Provider value={{ admin, isAuthenticated, signIn, signOut, signUp, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}