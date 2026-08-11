import "server-only";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "cplpconnect-media";

function getSupabaseClient() {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !serviceKey) {
        throw new Error("SUPABASE_URL / SUPABASE_SERVICE_KEY não estão definidas.");
    }
    return createClient(url, serviceKey);
}

let bucketEnsured = false;

async function ensureBucket(): Promise<void> {
    if (bucketEnsured) return;
    const supabase = getSupabaseClient();
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((bucket) => bucket.name === BUCKET)) {
        await supabase.storage.createBucket(BUCKET, { public: true });
    }
    bucketEnsured = true;
}

function extractStoragePath(url: string): string | null {
    const marker = `/object/public/${BUCKET}/`;
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return url.slice(index + marker.length);
}

export async function uploadImage(file: File, folder: string): Promise<string> {
    await ensureBucket();
    const supabase = getSupabaseClient();

    const extension = file.name.split(".").pop() || "jpg";
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type || "image/jpeg", upsert: false });

    if (error) {
        throw new Error(`Erro ao carregar imagem para o Supabase: ${error.message}`);
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export async function deleteImage(url: string | null | undefined): Promise<void> {
    if (!url) return;
    const path = extractStoragePath(url);
    if (!path) return;

    try {
        const supabase = getSupabaseClient();
        await supabase.storage.from(BUCKET).remove([path]);
    } catch {
        // Falha ao apagar uma imagem órfã não deve impedir a operação principal.
    }
}
