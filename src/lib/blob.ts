import "server-only";
import { put, del } from "@vercel/blob";

export async function uploadImage(file: File, folder: string): Promise<string> {
    const extension = file.name.split(".").pop() ?? "bin";
    const pathname = `${folder}/${crypto.randomUUID()}.${extension}`;
    const blob = await put(pathname, file, { access: "public" });
    return blob.url;
}

export async function deleteImage(url: string | null | undefined): Promise<void> {
    if (!url) return;
    try {
        await del(url);
    } catch {
        // Falha ao apagar um blob órfão não deve impedir a operação principal.
    }
}
