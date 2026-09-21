import { redirect } from "next/navigation";

export default async function DefinirPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;
    const suffix = token ? `?token=${encodeURIComponent(token)}` : "";
    redirect(`${process.env.ACADEMY_URL}/definir-password${suffix}`);
}
