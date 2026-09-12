// Hero escuro e consistente para todas as páginas secundárias do site,
// alinhado com a estética da homepage — título e descrição em branco sobre
// fundo navy com gradientes e grão subtil. Quando existe uma imagem definida
// no admin (Heros de Página), essa imagem entra como camada de fundo.
import React from "react";
import Image from "next/image";

interface PageHeroProps {
    title: string;
    description?: string;
    imageUrl?: string | null;
}

const PageHero = ({ title, description, imageUrl }: PageHeroProps) => {
    return (
        <section className="relative overflow-hidden bg-[#050B1F] pt-32 pb-16 md:pt-40 md:pb-20">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover -z-30 opacity-25 mix-blend-luminosity"
                    sizes="100vw"
                />
            )}
            <div
                aria-hidden
                className="absolute inset-0 -z-20"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(5,84,245,0.32), transparent 60%), radial-gradient(ellipse 50% 45% at 100% 100%, rgba(5,196,128,0.2), transparent 60%), linear-gradient(180deg, #050B1F 0%, #060C22 100%)",
                }}
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)",
                }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay bg-noise" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-white/75 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PageHero;
