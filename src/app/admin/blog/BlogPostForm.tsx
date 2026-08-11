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
import MarkdownRenderer from "@/components/MarkdownRenderer";
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

export default function BlogPostForm({ post }: { post?: BlogPost }) {
    const action = post ? updateBlogPost.bind(null, post.id) : createBlogPost;
    const [state, formAction] = useActionState<BlogPostActionResult, FormData>(action, {});
    const [content, setContent] = useState(post?.content ?? "");

    return (
        <form action={formAction} className="space-y-6">
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
                            <div className="space-y-2">
                                <Label htmlFor="authorName">Autor</Label>
                                <Input id="authorName" name="authorName" defaultValue={post?.authorName ?? ""} className="rounded-md" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                            <CardContent className="p-4">
                                <Label htmlFor="content" className="mb-2 block">
                                    Conteúdo (Markdown)
                                </Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    className="rounded-md h-96 font-mono text-sm"
                                    placeholder="# Título&#10;&#10;Escreve o conteúdo em Markdown..."
                                />
                            </CardContent>
                        </Card>

                        <Card className="border border-cplp-line bg-white shadow-none rounded-lg overflow-hidden">
                            <CardContent className="p-4 h-full overflow-y-auto max-h-[26rem]">
                                <p className="text-xs font-semibold uppercase tracking-wide text-cplp-grey mb-3">
                                    Pré-visualização
                                </p>
                                {content ? (
                                    <MarkdownRenderer content={content} />
                                ) : (
                                    <p className="text-sm text-cplp-grey">O conteúdo aparece aqui à medida que escreves.</p>
                                )}
                            </CardContent>
                        </Card>
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
