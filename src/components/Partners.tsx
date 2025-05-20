'use client';
import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const partners = [
    {
        name: 'Governo de Angola',
        image: '/angola.png',
        alt: 'Governo de Angola Logo',
    },
    {
        name: 'Cabo Verde Digital',
        image: '/cv.svg',
        alt: 'Cabo Verde Digital Logo',
    },
    {
        name: 'Moçambique Tech',
        image: '/moz.svg',
        alt: 'Moçambique Tech Logo',
    },
    {
        name: 'Devsembo',
        image: '/devsembo.png',
        alt: 'Devsembo Software house',
    }
];

export default function TrustedPartnersSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
    });

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    // Autoplay loop infinito
    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000); // 3 segundos

        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-xl text-gray-600 mb-8">Parceiros de Confiança</h2>
                <div className="relative">
                    <div className="embla overflow-hidden" ref={emblaRef}>
                        <div className="embla__container flex">
                            {partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className="embla__slide flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] px-4"
                                >
                                    <div className="flex justify-center items-center h-32">
                                        <Image
                                            src={partner.image}
                                            alt={partner.alt}
                                            width={160}
                                            height={80}
                                            priority
                                            className="object-contain h-full w-auto"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botões de navegação (opcional) */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hidden "
                        onClick={scrollPrev}
                        aria-label="Parceiro anterior"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hidden "
                        onClick={scrollNext}
                        aria-label="Próximo parceiro"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
