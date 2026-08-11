"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Pencil, Trash2, Send } from "lucide-react";
import { toast } from "sonner";
import { deleteBlogPost, sendNewsletterForPost } from "./actions";

export default function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
    const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
    const [sendTarget, setSendTarget] = useState<BlogPost | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isSending, startSend] = useTransition();

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
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium text-cplp-navy">{post.title}</TableCell>
                                <TableCell>
                                    <Badge variant={post.published ? "default" : "outline"}>
                                        {post.published ? "Publicado" : "Rascunho"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("pt-PT") : "—"}
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {post.newsletterSentAt ? (
                                        <Badge variant="secondary">Enviada</Badge>
                                    ) : (
                                        <span className="text-xs">Não enviada</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {post.published && !post.newsletterSentAt && (
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
                        ))}
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-cplp-grey py-8">
                                    Sem posts ainda.
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
