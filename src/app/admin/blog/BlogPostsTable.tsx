"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Send, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteBlogPost, sendNewsletterForPost } from "./actions";

type StatusFilter = "all" | "published" | "scheduled" | "draft";

function getStatus(post: BlogPost): "published" | "scheduled" | "draft" {
    if (!post.published) return "draft";
    if (post.publishedAt && post.publishedAt > new Date()) return "scheduled";
    return "published";
}

const STATUS_LABEL: Record<ReturnType<typeof getStatus>, string> = {
    published: "Publicado",
    scheduled: "Agendado",
    draft: "Rascunho",
};

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "published", label: "Publicados" },
    { value: "scheduled", label: "Agendados" },
    { value: "draft", label: "Rascunhos" },
];

export default function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
    const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
    const [sendTarget, setSendTarget] = useState<BlogPost | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isSending, startSend] = useTransition();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();
        return posts.filter((post) => {
            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.category?.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query));
            const matchesStatus = statusFilter === "all" || getStatus(post) === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [posts, search, statusFilter]);

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteBlogPost(id);
            toast.success("Post eliminado.");
            setDeleteTarget(null);
        });
    };

    const handleSend = () => {
        if (!sendTarget) return;
        const id = sendTarget.id;
        startSend(async () => {
            const result = await sendNewsletterForPost(id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`Newsletter enviada: ${result.sent} com sucesso, ${result.failed} falhas.`);
            }
            setSendTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-cplp-navy">Blog</h1>
                <Button asChild className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2">
                    <Link href="/admin/blog/nova">
                        <Plus className="w-4 h-4" />
                        Novo Post
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cplp-grey" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Procurar por título, categoria ou tag..."
                        className="rounded-md pl-9"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {STATUS_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => setStatusFilter(filter.value)}
                            className={cn(
                                "text-sm font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer",
                                statusFilter === filter.value
                                    ? "bg-cplp-blue text-white border-cplp-blue"
                                    : "bg-white text-cplp-grey border-cplp-line hover:bg-cplp-bg",
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Publicado em</TableHead>
                            <TableHead>Newsletter</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.map((post) => {
                            const status = getStatus(post);
                            return (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium text-cplp-navy">
                                    {post.title}
                                    {(post.category || post.tags.length > 0) && (
                                        <p className="text-xs font-normal text-cplp-grey mt-0.5">
                                            {[post.category, ...post.tags].filter(Boolean).join(" · ")}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={status === "draft" ? "outline" : "default"}
                                        className={status === "scheduled" ? "bg-cplp-green hover:bg-cplp-green" : undefined}
                                    >
                                        {STATUS_LABEL[status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleString("pt-PT", {
                                              dateStyle: "short",
                                              timeStyle: status === "scheduled" ? "short" : undefined,
                                          })
                                        : "—"}
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {post.newsletterSentAt ? (
                                        <Badge variant="secondary">Enviada</Badge>
                                    ) : (
                                        <span className="text-xs">Não enviada</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {status === "published" && !post.newsletterSentAt && (
                                        <Button variant="ghost" size="sm" onClick={() => setSendTarget(post)} title="Enviar Newsletter">
                                            <Send className="w-4 h-4 text-cplp-blue" />
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/blog/${post.id}/editar`}>
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(post)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        {filteredPosts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-cplp-grey py-8">
                                    {posts.length === 0 ? "Sem posts ainda." : "Nenhum post corresponde à pesquisa."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O post &quot;{deleteTarget?.title}&quot; será removido
                            permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-red-600 hover:bg-red-700">
                            {isPending ? "A eliminar..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={sendTarget !== null} onOpenChange={(open) => !open && setSendTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Enviar newsletter?</AlertDialogTitle>
                        <AlertDialogDescription>
                            O post &quot;{sendTarget?.title}&quot; será enviado por email a todos os subscritores
                            ativos. Esta ação não pode ser repetida para o mesmo post.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSend} disabled={isSending} className="bg-cplp-blue hover:bg-cplp-blue-hover">
                            {isSending ? "A enviar..." : "Enviar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
