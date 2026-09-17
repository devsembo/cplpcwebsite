import { SignJWT, jwtVerify } from "jose";

export const FORMANDO_SESSION_COOKIE_NAME = "formando_session";
export const FORMANDO_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 dias

export interface FormandoSessionPayload {
    sub: string;
    email: string;
}

function getFormandoSecretKey() {
    const secret = process.env.FORMANDO_SESSION_SECRET;
    if (!secret) {
        throw new Error("FORMANDO_SESSION_SECRET não está definida.");
    }
    return new TextEncoder().encode(secret);
}

export async function createFormandoSessionToken(payload: FormandoSessionPayload): Promise<string> {
    return new SignJWT({ email: payload.email })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(payload.sub)
        .setIssuedAt()
        .setExpirationTime(`${FORMANDO_SESSION_DURATION_SECONDS}s`)
        .sign(getFormandoSecretKey());
}

export async function verifyFormandoSessionToken(token: string): Promise<FormandoSessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getFormandoSecretKey());
        if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
            return null;
        }
        return { sub: payload.sub, email: payload.email };
    } catch {
        return null;
    }
}
