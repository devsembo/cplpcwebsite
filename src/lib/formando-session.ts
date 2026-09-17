import "server-only";
import { cookies } from "next/headers";
import {
    FORMANDO_SESSION_COOKIE_NAME,
    FORMANDO_SESSION_DURATION_SECONDS,
    createFormandoSessionToken,
    verifyFormandoSessionToken,
    type FormandoSessionPayload,
} from "@/lib/formando-auth";

export async function setFormandoSessionCookie(payload: FormandoSessionPayload) {
    const token = await createFormandoSessionToken(payload);
    const store = await cookies();
    store.set(FORMANDO_SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: FORMANDO_SESSION_DURATION_SECONDS,
    });
}

export async function clearFormandoSessionCookie() {
    const store = await cookies();
    store.delete(FORMANDO_SESSION_COOKIE_NAME);
}

export async function getFormandoSession(): Promise<FormandoSessionPayload | null> {
    const store = await cookies();
    const token = store.get(FORMANDO_SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyFormandoSessionToken(token);
}
