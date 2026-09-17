import "server-only";
import { getSession } from "@/lib/session";

export async function requireAdminSession() {
    const session = await getSession();
    if (!session) {
        throw new Error("Não autorizado — sessão de admin em falta ou inválida.");
    }
    return session;
}
