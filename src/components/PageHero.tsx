// Hero simples e consistente para todas as páginas secundárias do site:
// título em navy + parágrafo em cinza, sobre fundo branco.
import React from "react";

interface PageHeroProps {
    title: string;
    description?: string;
}

const PageHero = ({ title, description }: PageHeroProps) => {
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
