import { getFormandos } from "@/lib/data/academy";
import FormandosTable from "./FormandosTable";

export default async function AdminFormandosPage() {
    const formandos = await getFormandos();
    return <FormandosTable formandos={formandos} />;
}
