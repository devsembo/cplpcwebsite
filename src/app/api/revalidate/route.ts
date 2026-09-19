import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
        return NextResponse.json({ error: "REVALIDATE_SECRET não configurado." }, { status: 500 });
    }

    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const paths = Array.isArray(body?.paths)
        ? body.paths.filter((p: unknown): p is string => typeof p === "string" && p.startsWith("/"))
        : [];

    if (paths.length === 0) {
        return NextResponse.json({ error: "paths em falta ou inválidos." }, { status: 400 });
    }

    for (const path of paths) {
        revalidatePath(path);
    }

    return NextResponse.json({ revalidated: paths });
}
