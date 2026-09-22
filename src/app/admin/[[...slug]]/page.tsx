import { redirect } from "next/navigation";

export default function AdminRedirect() {
    if (!process.env.ACADEMY_URL) {
        throw new Error("ACADEMY_URL não está configurado — o redirect do admin para o academy não pode funcionar.");
    }
    redirect(`${process.env.ACADEMY_URL}/admin`);
}
