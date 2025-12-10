// components/AnimatedBackground.tsx ou AnimatedBackground.jsx

// 1. OBRIGATÓRIO: Declara o componente como Cliente, pois usa animações CSS dinâmicas
"use client";

import React from 'react';

const AnimatedBackground = () => {

    // O Mesh Gradient com fallback para a cor de fundo (bg-background)
    // Nota: Você pode usar a classe `bg-gradient-mesh` se tiver mapeado a variável no tailwind.config.js
    const meshGradientStyle = {
        background: 'radial-gradient(at 40% 20%, hsla(217, 91%, 25%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(142, 76%, 20%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(217, 91%, 15%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(142, 76%, 18%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(217, 91%, 18%, 0.3) 0px, transparent 50%), hsl(222, 47%, 11%)'
    };

    // O Grid Overlay
    const gridStyle = {
        backgroundImage: `
      linear-gradient(hsl(217, 91%, 60%) 1px, transparent 1px),
      linear-gradient(90deg, hsl(217, 91%, 60%) 1px, transparent 1px)
    `,
        backgroundSize: '50px 50px'
    };

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Mesh gradient background (Mantido o estilo inline para garantir a compatibilidade, mas o código é o mesmo) */}
            <div className="absolute inset-0 bg-background" style={meshGradientStyle} />

            {/* Animated orbs (Animações CSS) */}
            <div
                className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"
            // A sintaxe animate-[...] é mais segura para Tailwind
            />
            <div
                className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"
                style={{ animationDelay: '2s' }}
            />
            <div
                className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"
                style={{ animationDelay: '4s' }}
            />

            {/* Grid overlay (Mantido o estilo inline) */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={gridStyle}
            />

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent animate-[scan_6s_linear_infinite]"
                // Ajustado a sintaxe da animação para garantir que o Next.js/Tailwind a reconheça
                />
            </div>
        </div>
    );
};

export default AnimatedBackground;