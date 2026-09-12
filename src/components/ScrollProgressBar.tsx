"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Linha de progresso de leitura no topo da página, ligada ao scroll.
export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-cplp-blue"
            style={{ scaleX }}
        />
    );
}
