"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import type { PageKey } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updatePageHeroImage, removePageHeroImage, type HeroActionResult } from "./actions";

const PAGE_LABELS: Record<PageKey, string> = {
    home: "Início",
    sobre: "Sobre Nós",
    servicos: "Serviços",
    projetos: "Projetos",
    academy: "Academy",
    carreiras: "Carreiras",
    contacto: "Contacto",
    faqs: "Perguntas Frequentes",
};

function UploadButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="sm" disabled={pending} className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
            {pending ? "A carregar..." : "Carregar"}
        </Button>
    );
}

export default function HeroImageForm({ pageKey, imageUrl }: { pageKey: PageKey; imageUrl: string | null }) {
    const action = updatePageHeroImage.bind(null, pageKey);
    const [state, formAction] = useActionState<HeroActionResult, FormData>(action, {});
    const [isRemoving, startRemove] = useTransition();

    useEffect(() => {
        if (state.success) {
            toast.success("Imagem atualizada.");
        }
    }, [state]);

    return (
        <div className="border border-cplp-line bg-white rounded-lg p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-cplp-navy">{PAGE_LABELS[pageKey]}</h3>
            </div>

            <div className="h-32 rounded-md bg-cplp-bg border border-cplp-line overflow-hidden relative flex items-center justify-center">
                {imageUrl ? (
                    <Image src={imageUrl} alt="" fill className="object-cover" />
                ) : (
                    <span className="text-xs text-cplp-grey">Sem imagem</span>
                )}
            </div>

            <form action={formAction} className="flex gap-2">
                <Input type="file" name="image" accept="image/*" required className="rounded-md text-xs" />
                <UploadButton />
            </form>

            {state.error && <p className="text-xs text-red-600">{state.error}</p>}

            {imageUrl && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isRemoving}
                    onClick={() =>
                        startRemove(async () => {
                            await removePageHeroImage(pageKey);
                            toast.success("Imagem removida.");
                        })
                    }
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-fit"
                >
                    {isRemoving ? "A remover..." : "Remover imagem"}
                </Button>
            )}
        </div>
    );
}
