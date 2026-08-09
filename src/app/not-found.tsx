'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-xl mx-auto py-20">
                <Image
                    src="/404.avif"
                    alt="Página não encontrada"
                    width={320}
                    height={240}
                    className="w-full max-w-xs mx-auto mb-8"
                    priority
                />

                <h1 className="text-3xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mb-4">
                    Página não encontrada
                </h1>
                <p className="text-cplp-grey mb-10 leading-relaxed">
                    A página que procura não existe ou foi movida para outro endereço.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Voltar ao Início
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.back()}
                        className="border-cplp-line text-cplp-navy hover:bg-cplp-bg rounded-md"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Página Anterior
                    </Button>
                </div>
            </div>
        </div>
    );
}
