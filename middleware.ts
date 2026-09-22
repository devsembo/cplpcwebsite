import { NextRequest, NextResponse } from "next/server";
import { FORMANDO_SESSION_COOKIE_NAME, verifyFormandoSessionToken } from "@/lib/formando-auth";

const PUBLIC_PORTAL_PATHS = ["/portal/login", "/portal/registar", "/portal/recuperar-password", "/portal/definir-password"];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/portal")) {
        if (PUBLIC_PORTAL_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
            return NextResponse.next();
        }

        const token = request.cookies.get(FORMANDO_SESSION_COOKIE_NAME)?.value;
        const session = token ? await verifyFormandoSessionToken(token) : null;
        if (!session) {
            return NextResponse.redirect(new URL("/portal/login", request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/portal/:path*"],
};
