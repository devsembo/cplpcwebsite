import { notFound } from "next/navigation";
import { getFormandoById } from "@/lib/data/academy";
import { getSessionOptions, getCompanyOptions } from "@/lib/data/academy";
import FormandoDetail from "./FormandoDetail";

export type FormandoWithRelations = NonNullable<Awaited<ReturnType<typeof getFormandoById>>>;

export default async function AdminFormandoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [formando, sessionOptions, companyOptions] = await Promise.all([
        getFormandoById(id),
        getSessionOptions(),
        getCompanyOptions(),
    ]);

    if (!formando) notFound();

    return (
        <FormandoDetail formando={formando} sessionOptions={sessionOptions} companyOptions={companyOptions} />
    );
}
