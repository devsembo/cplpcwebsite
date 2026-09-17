export function formandoDefinirPasswordEmail(input: {
    name: string;
    link: string;
    purpose: "setup" | "reset";
}): { subject: string; html: string } {
    const subject =
        input.purpose === "setup"
            ? "Ativa o teu acesso ao Portal do Formando — CPLP CONNECT Academy"
            : "Repor a tua password — CPLP CONNECT Academy";

    const intro =
        input.purpose === "setup"
            ? `Olá ${input.name}, a tua inscrição na CPLP CONNECT Academy já está confirmada. Define a tua password para aceder ao Portal do Formando:`
            : `Olá ${input.name}, recebemos um pedido para repor a tua password no Portal do Formando:`;

    return {
        subject,
        html: `
            <p>${intro}</p>
            <p><a href="${input.link}">${input.link}</a></p>
            <p>Este link é válido durante 24 horas e só pode ser usado uma vez.</p>
            <p>Se não pediste isto, ignora este email.</p>
        `,
    };
}
