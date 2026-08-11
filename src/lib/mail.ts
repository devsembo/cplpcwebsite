import "server-only";
import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
    if (transporter) return transporter;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
        throw new Error("Configuração SMTP em falta (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD).");
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    return transporter;
}

export async function sendMail(options: { to: string; subject: string; html: string }): Promise<void> {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    await getTransporter().sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
    });
}
