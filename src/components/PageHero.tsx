// Hero simples e consistente para todas as páginas secundárias do site:
// título em navy + parágrafo em cinza, sobre fundo branco — ou, quando existe
// uma imagem definida no admin (Heros de Página), texto branco sobre a foto.
import React from "react";
import Image from "next/image";

interface PageHeroProps {
    title: string;
    description?: string;
    imageUrl?: string | null;
}

const PageHero = ({ title, description, imageUrl }: PageHeroProps) => {
    if (imageUrl) {
        return (
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover -z-20"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-cplp-navy/60 -z-10" />
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-lg text-white/85 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-cplp-navy tracking-tight mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-cplp-grey leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;
