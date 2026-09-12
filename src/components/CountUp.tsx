"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Anima um valor numérico de 0 até ao alvo quando entra em vista.
// Valores sem dígitos (ex: "Porto") são mostrados tal como estão.
export default function CountUp({ value, className }: { value: string; className?: string }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const displayRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

    const match = value.match(/^(\D*)(\d+)(.*)$/);
    const prefix = match?.[1] ?? "";
    const digits = match?.[2] ?? "";
    const suffix = match?.[3] ?? "";
    const target = digits ? parseInt(digits, 10) : 0;

    const count = useMotionValue(0);
    const spring = useSpring(count, { stiffness: 90, damping: 20 });

    useEffect(() => {
        if (isInView && match) count.set(target);
    }, [isInView, target, count, match]);

    useEffect(() => {
        if (!match) return;
        const unsubscribe = spring.on("change", (latest) => {
            if (displayRef.current) {
                displayRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
            }
        });
        return unsubscribe;
    }, [spring, prefix, suffix, match]);

    if (!match) {
        return (
            <span ref={containerRef} className={className}>
                {value}
            </span>
        );
    }

    return (
        <span ref={containerRef} className={className}>
            <span ref={displayRef}>{prefix}0{suffix}</span>
        </span>
    );
}
