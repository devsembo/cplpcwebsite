import { redirect } from "next/navigation";

export default async function DefinirPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;
    const suffix = token ? `?token=${encodeURIComponent(token)}` : "";
    if (!process.env.ACADEMY_URL) {
        throw new Error("ACADEMY_URL não está configurado — o redirect do portal para o academy não pode funcionar.");
    }
    redirect(`${process.env.ACADEMY_URL}/definir-password${suffix}`);
}
