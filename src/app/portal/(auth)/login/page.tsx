import { redirect } from "next/navigation";

export default function PortalLoginPage() {
    if (!process.env.ACADEMY_URL) {
        throw new Error("ACADEMY_URL não está configurado — o redirect do portal para o academy não pode funcionar.");
    }
    redirect(`${process.env.ACADEMY_URL}/login`);
}
