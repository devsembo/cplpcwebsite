'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {

    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center gradient-elegant relative overflow-hidden">
            {/* Floating elements for decoration */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
            <div className="absolute bottom-32 right-16 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-20 w-12 h-12 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />

            <div className="text-center max-w-2xl mx-auto px-6 animate-fade-in">
                {/* Main illustration */}
                <div className="mb-1 animate-fade-in-up">
                    <Image
                        src="/404.avif"
                        alt="Página não encontrada"
                        width={400}
                        height={300}
                        className="w-full max-w-md mx-auto rounded-xl shadow-elegant"
                    />
                </div>

                {/* Error number with gradient */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent gradient-primary leading-none">
                        404
                    </h1>
                </div>

                {/* Error message */}
                <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        Oops! Página não encontrada
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        A página que você está procurando não existe ou foi movida para outro endereço.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="min-w-[160px]"
                    >
                        <Link href="/" className="flex items-center gap-2 cursor-pointer">
                            <Home className="w-5 h-5" />
                            Voltar ao Início
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.back}
                        
                        className="min-w-[160px] hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Página Anterior
                    </Button>
                </div>

                {/* Additional help text */}
                <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <p className="text-sm text-muted-foreground">
                        Se você acredita que isso é um erro, entre em contato com o suporte.
                    </p>
                </div>
            </div>
        </div>
    );
}