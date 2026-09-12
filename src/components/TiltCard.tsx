"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    /** Rotação máxima em graus ao mover o rato sobre o cartão. */
    intensity?: number;
    /** Reflexo de luz que segue o cursor — usado em cartões escuros/vidro. */
    glare?: boolean;
}

// Cartão com inclinação 3D que segue o rato (efeito usado nos módulos
// flutuantes da Hero e nos cartões de serviços/setores).
export default function TiltCard({ children, className, intensity = 10, glare = false }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), { stiffness: 220, damping: 22 });
    const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), { stiffness: 220, damping: 22 });
    const glareBackground = useTransform([px, py], (latest) => {
        const [gx, gy] = latest as number[];
        return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.35), transparent 55%)`;
    });

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    };

    const handlePointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className={cn("relative [transform-style:preserve-3d]", className)}
        >
            {children}
            {glare && (
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{ background: glareBackground }}
                />
            )}
        </motion.div>
    );
}
