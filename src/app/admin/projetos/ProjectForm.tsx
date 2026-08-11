"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/validate-image";
import { createProject, updateProject, type ProjectActionResult } from "./actions";

function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = validateImageFile(file);
    if (error) {
        toast.error(error);
        e.target.value = "";
    }
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
            disabled={pending}
        >
            {pending ? "A guardar..." : label}
        </Button>
    );
}

export default function ProjectForm({
    project,
    onSuccess,
}: {
    project?: Project;
    onSuccess: () => void;
}) {
    const action = project ? updateProject.bind(null, project.id) : createProject;
    const [state, formAction] = useActionState<ProjectActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{project ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" name="title" defaultValue={project?.title} required className="rounded-md" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={project?.description}
                        required
                        className="rounded-md h-24"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input id="category" name="category" defaultValue={project?.category} required className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order">Ordem</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            min={0}
                            defaultValue={project?.order ?? 0}
                            required
                            className="rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                        id="tags"
                        name="tags"
                        defaultValue={project?.tags?.join(", ")}
                        placeholder="Next.js, Fintech"
                        className="rounded-md"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="accentFrom">Cor inicial</Label>
                        <Input
                            id="accentFrom"
                            name="accentFrom"
                            type="color"
                            defaultValue={project?.accentFrom ?? "#0554F5"}
                            required
                            className="rounded-md h-10 p-1"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accentTo">Cor final</Label>
                        <Input
                            id="accentTo"
                            name="accentTo"
                            type="color"
                            defaultValue={project?.accentTo ?? "#05C480"}
                            required
                            className="rounded-md h-10 p-1"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Imagem do projeto</Label>
                    {project?.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={project.imageUrl}
                            alt=""
                            className="h-24 w-full object-cover rounded-md border border-cplp-line mb-2"
                        />
                    )}
                    <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} className="rounded-md" />
                    <p className="text-xs text-cplp-grey">
                        Opcional — sem imagem, o cartão mostra o padrão de cor gerado a partir das cores acima.
                    </p>
                    {project?.imageUrl && (
                        <label className="flex items-center gap-2 text-sm text-cplp-grey mt-2">
                            <input type="checkbox" name="removeImage" className="rounded" />
                            Remover imagem atual
                        </label>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Switch id="comingSoon" name="comingSoon" defaultChecked={project?.comingSoon} />
                    <Label htmlFor="comingSoon">Marcar como &quot;Em breve&quot;</Label>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={project ? "Guardar Alterações" : "Criar Projeto"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
