// Lockup tipográfico provisório da CPLP CONNECT Academy.
// TODO: substituir por public/brand/svg/academy-lockup-h-{light,dark}.svg
// assim que os ficheiros de marca oficiais estiverem disponíveis.
import React from "react";

interface AcademyLockupProps {
    theme?: "dark" | "light";
    className?: string;
}

const AcademyLockup = ({ theme = "dark", className = "" }: AcademyLockupProps) => {
    const wordColor = theme === "dark" ? "#FFFFFF" : "#0B1533";

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold text-white"
                style={{ background: "linear-gradient(135deg, #0554F5 0%, #05C480 100%)" }}
                aria-hidden="true"
            >
                A
            </span>
            <span className="leading-tight text-left">
                <span className="block text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#05C480" }}>
                    CPLP CONNECT
                </span>
                <span className="block text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: wordColor }}>
                    Academy
                </span>
            </span>
        </div>
    );
};

export default AcademyLockup;
