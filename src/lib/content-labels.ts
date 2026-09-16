import type {
    ApplicationStatus,
    CertificateStatus,
    CourseFormat,
    EnrollmentStatus,
    JobMode,
    JobType,
    SessionStatus,
    TrainingStatus,
} from "@prisma/client";

export const COURSE_FORMAT_LABELS: Record<CourseFormat, string> = {
    in_company: "In-Company",
    executive: "Executive Program",
    online: "Online & Híbrido",
    exchange: "Corporate Exchange",
};

export const COURSE_FORMAT_LABELS_EN: Record<CourseFormat, string> = {
    in_company: "In-Company",
    executive: "Executive Program",
    online: "Online & Hybrid",
    exchange: "Corporate Exchange",
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
    full_time: "Tempo inteiro",
    part_time: "Tempo parcial",
    estagio: "Estágio",
    freelance: "Freelance",
};

export const JOB_TYPE_LABELS_EN: Record<JobType, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    estagio: "Internship",
    freelance: "Freelance",
};

export const JOB_MODE_LABELS: Record<JobMode, string> = {
    presencial: "Presencial",
    hibrido: "Híbrido",
    remoto: "Remoto",
};

export const JOB_MODE_LABELS_EN: Record<JobMode, string> = {
    presencial: "On-site",
    hibrido: "Hybrid",
    remoto: "Remote",
};

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
    nova: "Nova",
    contactada: "Contactada",
    confirmada: "Confirmada",
    cancelada: "Cancelada",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
    nova: "Nova",
    em_analise: "Em análise",
    entrevista: "Entrevista",
    aceite: "Aceite",
    rejeitada: "Rejeitada",
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
    planeada: "Planeada",
    a_decorrer: "A decorrer",
    concluida: "Concluída",
};

export const TRAINING_STATUS_LABELS: Record<TrainingStatus, string> = {
    nao_iniciado: "Não iniciado",
    em_curso: "Em curso",
    concluido: "Concluído",
    reprovado: "Reprovado",
};

export const CERTIFICATE_STATUS_LABELS: Record<CertificateStatus, string> = {
    nao_elegivel: "Não elegível",
    elegivel: "Elegível",
    emitido: "Emitido",
};

// Ordem em que os estados aparecem nos filtros e nos seletores do admin.
export const ENROLLMENT_STATUSES = Object.keys(ENROLLMENT_STATUS_LABELS) as EnrollmentStatus[];
export const APPLICATION_STATUSES = Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[];
export const COURSE_FORMATS = Object.keys(COURSE_FORMAT_LABELS) as CourseFormat[];
export const JOB_TYPES = Object.keys(JOB_TYPE_LABELS) as JobType[];
export const JOB_MODES = Object.keys(JOB_MODE_LABELS) as JobMode[];
export const SESSION_STATUSES = Object.keys(SESSION_STATUS_LABELS) as SessionStatus[];
export const TRAINING_STATUSES = Object.keys(TRAINING_STATUS_LABELS) as TrainingStatus[];
export const CERTIFICATE_STATUSES = Object.keys(CERTIFICATE_STATUS_LABELS) as CertificateStatus[];

export function localizedCourseFormat(format: CourseFormat, language: string): string {
    return language === "en" ? COURSE_FORMAT_LABELS_EN[format] : COURSE_FORMAT_LABELS[format];
}

export function localizedJobType(type: JobType, language: string): string {
    return language === "en" ? JOB_TYPE_LABELS_EN[type] : JOB_TYPE_LABELS[type];
}

export function localizedJobMode(mode: JobMode, language: string): string {
    return language === "en" ? JOB_MODE_LABELS_EN[mode] : JOB_MODE_LABELS[mode];
}
