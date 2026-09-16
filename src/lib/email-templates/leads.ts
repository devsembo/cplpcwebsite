import { COMPANY_INFO } from "@/lib/constants";

function layout(title: string, bodyHtml: string): string {
    return `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0B1533;">
        <div style="padding: 24px 0; text-align: center; background-color: #0B1533;">
            <span style="color: #ffffff; font-weight: 800; font-size: 18px; letter-spacing: -0.02em;">CPLP CONNECT</span>
        </div>
        <div style="padding: 32px 24px;">
            <h1 style="font-size: 20px; font-weight: 800; margin: 0 0 20px; letter-spacing: -0.02em;">${title}</h1>
            ${bodyHtml}
        </div>
        <div style="padding: 24px; border-top: 1px solid #E5E9F0; text-align: center;">
            <p style="font-size: 12px; color: #94A0B4; margin: 0;">${COMPANY_INFO.legalName} — ${COMPANY_INFO.address}</p>
        </div>
    </div>
    `.trim();
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function rows(fields: { label: string; value: string | null | undefined }[]): string {
    return fields
        .filter((field) => field.value)
        .map(
            (field) => `
            <tr>
                <td style="padding: 6px 12px 6px 0; font-size: 13px; color: #5A6478; vertical-align: top; white-space: nowrap;">${field.label}</td>
                <td style="padding: 6px 0; font-size: 14px; color: #0B1533;">${escapeHtml(String(field.value))}</td>
            </tr>`,
        )
        .join("");
}

// Email interno — avisa a equipa de que chegou um pedido novo.
export function buildEnrollmentNotification(data: {
    courseTitle: string;
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    role?: string | null;
    message?: string | null;
}): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cplpconnect.pt";
    return layout(
        `Nova inscrição: ${escapeHtml(data.courseTitle)}`,
        `
        <table style="width: 100%; border-collapse: collapse;">
            ${rows([
                { label: "Curso", value: data.courseTitle },
                { label: "Nome", value: data.name },
                { label: "Email", value: data.email },
                { label: "Telefone", value: data.phone },
                { label: "Empresa", value: data.company },
                { label: "Função", value: data.role },
                { label: "Mensagem", value: data.message },
            ])}
        </table>
        <p style="margin: 24px 0 0;">
            <a href="${siteUrl}/admin/inscricoes" style="display: inline-block; background-color: #0554F5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Ver no admin</a>
        </p>`,
    );
}

export function buildApplicationNotification(data: {
    jobTitle: string;
    name: string;
    email: string;
    phone?: string | null;
    area?: string | null;
    cvUrl: string;
    message?: string | null;
}): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cplpconnect.pt";
    return layout(
        `Nova candidatura: ${escapeHtml(data.jobTitle)}`,
        `
        <table style="width: 100%; border-collapse: collapse;">
            ${rows([
                { label: "Vaga", value: data.jobTitle },
                { label: "Nome", value: data.name },
                { label: "Email", value: data.email },
                { label: "Telefone", value: data.phone },
                { label: "Área", value: data.area },
                { label: "CV", value: data.cvUrl },
                { label: "Mensagem", value: data.message },
            ])}
        </table>
        <p style="margin: 24px 0 0;">
            <a href="${siteUrl}/admin/candidaturas" style="display: inline-block; background-color: #0554F5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">Ver no admin</a>
        </p>`,
    );
}

// Email de confirmação para quem se inscreveu / candidatou.
export function buildLeadConfirmation(data: {
    name: string;
    intro: string;
    detail: string;
}): string {
    return layout(
        `Obrigado, ${escapeHtml(data.name.split(" ")[0])}!`,
        `
        <p style="font-size: 15px; line-height: 1.6; color: #5A6478; margin: 0 0 12px;">${escapeHtml(data.intro)}</p>
        <p style="font-size: 15px; line-height: 1.6; color: #5A6478; margin: 0;">${escapeHtml(data.detail)}</p>`,
    );
}
