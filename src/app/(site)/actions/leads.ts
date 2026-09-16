"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { COMPANY_INFO } from "@/lib/constants";
import { enrollmentSchema } from "@/lib/schemas/course";
import { jobApplicationSchema } from "@/lib/schemas/job";
import { sendMail } from "@/lib/mail";
import {
    buildApplicationNotification,
    buildEnrollmentNotification,
    buildLeadConfirmation,
} from "@/lib/email-templates/leads";

export interface LeadResult {
    error?: string;
    success?: boolean;
}

function notificationRecipient(): string {
    return process.env.ADMIN_EMAIL || process.env.SMTP_FROM || COMPANY_INFO.email;
}

// O email é um extra: se o SMTP falhar, o pedido já está guardado na base de
// dados e visível no admin, por isso nunca devolvemos erro ao utilizador.
async function sendQuietly(to: string, subject: string, html: string): Promise<void> {
    try {
        await sendMail({ to, subject, html });
    } catch (error) {
        console.error("Falha ao enviar email de notificação:", error);
    }
}

export async function submitEnrollment(
    _prevState: LeadResult,
    formData: FormData
): Promise<LeadResult> {
    const parsed = enrollmentSchema.safeParse({
        courseId: formData.get("courseId"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        role: formData.get("role"),
        message: formData.get("message"),
        consent: formData.get("consent") === "on",
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const { consent: _consent, ...data } = parsed.data;

    const course = await prisma.course.findFirst({
        where: { id: data.courseId, published: true },
    });
    if (!course) {
        return { error: "Este curso já não está disponível." };
    }

    await prisma.courseEnrollment.create({
        data: { ...data, email: data.email.toLowerCase() },
    });

    await sendQuietly(
        notificationRecipient(),
        `Nova inscrição — ${course.title}`,
        buildEnrollmentNotification({ courseTitle: course.title, ...data }),
    );
    await sendQuietly(
        data.email,
        `Inscrição recebida — ${course.title}`,
        buildLeadConfirmation({
            name: data.name,
            intro: `Recebemos o seu pedido de inscrição no curso "${course.title}".`,
            detail: "A equipa da CPLP CONNECT Academy entrará em contacto consigo em breve com os próximos passos.",
        }),
    );

    revalidatePath("/admin/inscricoes");
    revalidatePath("/admin");
    return { success: true };
}

export async function submitJobApplication(
    _prevState: LeadResult,
    formData: FormData
): Promise<LeadResult> {
    const parsed = jobApplicationSchema.safeParse({
        jobId: formData.get("jobId"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        area: formData.get("area"),
        cvUrl: formData.get("cvUrl"),
        message: formData.get("message"),
        consent: formData.get("consent") === "on",
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const { consent: _consent, ...data } = parsed.data;

    // Sem jobId (ou com uma vaga entretanto fechada) a candidatura é espontânea.
    const job = data.jobId
        ? await prisma.jobOpening.findFirst({ where: { id: data.jobId, published: true } })
        : null;

    await prisma.jobApplication.create({
        data: {
            ...data,
            jobId: job?.id ?? null,
            email: data.email.toLowerCase(),
        },
    });

    const jobTitle = job?.title ?? "Candidatura espontânea";

    await sendQuietly(
        notificationRecipient(),
        `Nova candidatura — ${jobTitle}`,
        buildApplicationNotification({ jobTitle, ...data }),
    );
    await sendQuietly(
        data.email,
        "Candidatura recebida — CPLP CONNECT",
        buildLeadConfirmation({
            name: data.name,
            intro: job
                ? `Recebemos a sua candidatura à vaga "${job.title}".`
                : "Recebemos a sua candidatura espontânea.",
            detail: "A nossa equipa vai analisar o seu perfil e entra em contacto caso haja um encaixe.",
        }),
    );

    revalidatePath("/admin/candidaturas");
    revalidatePath("/admin");
    return { success: true };
}
