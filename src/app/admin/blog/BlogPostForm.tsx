"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { BlogPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/validate-image";
import { createBlogPost, updateBlogPost, type BlogPostActionResult } from "./actions";

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

// Converte uma data para o formato aceite por <input type="datetime-local">.
function toDateTimeLocal(date: Date | null): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Conversão simples de Markdown (posts antigos) para HTML, só para carregar
// no editor visual sem perder texto. Não interpreta toda a sintaxe Markdown
// (bold/itálico ficam com os asteriscos literais) — o importante é que
// nenhum caractere do artigo original desapareça ao abrir para edição.
function markdownToEditableHtml(markdown: string): string {
    return markdown
        .split(/\n{2,}/)
        .map((block) => {
            const trimmed = block.trim();
            if (!trimmed) return "";
            const heading = trimmed.match(/^(#{1,3})\s+(.*)$/);
            if (heading) {
                const tag = `h${heading[1].length}`;
                return `<${tag}>${escapeHtml(heading[2])}</${tag}>`;
            }
            return `<p>${trimmed.split("\n").map(escapeHtml).join("<br>")}</p>`;
        })
        .filter(Boolean)
        .join("");
}

export default function BlogPostForm({ post }: { post?: BlogPost }) {
    const action = post ? updateBlogPost.bind(null, post.id) : createBlogPost;
    const [state, formAction] = useActionState<BlogPostActionResult, FormData>(action, {});
    const isLegacyMarkdown = Boolean(post && post.contentFormat !== "html");
    const initialEditorContent = post
        ? isLegacyMarkdown
            ? markdownToEditableHtml(post.content)
            : post.content
        : "";
    const [content, setContent] = useState(initialEditorContent);
    const isScheduled = Boolean(post?.published && post?.publishedAt && post.publishedAt > new Date());

    return (
        <form action={formAction} className="space-y-6">
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="contentFormat" value="html" />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título</Label>
                                <Input id="title" name="title" defaultValue={post?.title} required className="rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Resumo</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    defaultValue={post?.excerpt}
                                    required
                                    className="rounded-md h-20"
                                    placeholder="Mostrado na listagem do blog."
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="authorName">Autor</Label>
                                    <Input id="authorName" name="authorName" defaultValue={post?.authorName ?? ""} className="rounded-md" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Categoria</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        defaultValue={post?.category ?? ""}
                                        placeholder="Ex: Academy, Tecnologia"
                                        className="rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    defaultValue={post?.tags?.join(", ")}
                                    placeholder="Formação, Angola, Digital"
                                    className="rounded-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        {isLegacyMarkdown && (
                            <p className="text-xs text-cplp-blue bg-cplp-blue/[0.06] border border-cplp-blue/20 rounded-md px-3 py-2">
                                Este post foi escrito no formato antigo (Markdown). O texto foi carregado
                                automaticamente no editor novo — revê a formatação (títulos, negrito) antes de
                                gravar, porque a sintaxe antiga (ex: **negrito**) não é convertida automaticamente.
                            </p>
                        )}
                        <RichTextEditor
                            initialContent={initialEditorContent}
                            onChangeHtml={setContent}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="coverImage">Imagem de capa</Label>
                                {post?.coverImageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={post.coverImageUrl}
                                        alt=""
                                        className="h-32 w-full object-cover rounded-md border border-cplp-line mb-2"
                                    />
                                )}
                                <Input id="coverImage" name="coverImage" type="file" accept="image/*" onChange={handleImageChange} className="rounded-md" />
                                {post?.coverImageUrl && (
                                    <label className="flex items-center gap-2 text-sm text-cplp-grey mt-2">
                                        <input type="checkbox" name="removeCoverImage" className="rounded" />
                                        Remover imagem atual
                                    </label>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-cplp-line">
                                <Switch id="published" name="published" defaultChecked={post?.published} />
                                <Label htmlFor="published">Publicado</Label>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-cplp-line">
                                <Label htmlFor="scheduledAt">Publicar em</Label>
                                <Input
                                    id="scheduledAt"
                                    name="scheduledAt"
                                    type="datetime-local"
                                    defaultValue={toDateTimeLocal(post?.publishedAt ?? null)}
                                    className="rounded-md"
                                />
                                <p className="text-xs text-cplp-grey">
                                    Deixa em branco para publicar imediatamente. Uma data futura agenda o post — só
                                    fica visível no site a partir dessa data/hora.
                                </p>
                                {isScheduled && (
                                    <p className="text-xs font-semibold text-cplp-blue">
                                        Este post está agendado.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {state.error && (
                        <p className="text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <SubmitButton label={post ? "Guardar Alterações" : "Criar Post"} />
                </div>
            </div>
        </form>
    );
}
