// Versão sem "server-only" do cálculo do URL de verificação — pode ser usada
// em componentes de cliente (ex: para mostrar o link ao lado do QR no admin).
export function certificateVerificationUrl(code: string): string {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cplpconnect.pt";
    return `${base}/certificado/${code}`;
}
