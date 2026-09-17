export function formandoCertificadoEmitidoEmail(input: {
    name: string;
    courseTitle: string;
    code: string;
    verificationUrl: string;
}): { subject: string; html: string } {
    return {
        subject: `O teu certificado de "${input.courseTitle}" já está disponível`,
        html: `
            <p>Olá ${input.name},</p>
            <p>O teu certificado do curso <strong>${input.courseTitle}</strong> foi emitido.</p>
            <p>Código: <strong>${input.code}</strong></p>
            <p>Podes verificar e descarregar o certificado aqui: <a href="${input.verificationUrl}">${input.verificationUrl}</a></p>
            <p>Também podes consultá-lo a qualquer momento no Portal do Formando.</p>
        `,
    };
}
