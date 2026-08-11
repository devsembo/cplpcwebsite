import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostForm from "../../BlogPostForm";

export default async function EditBlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-6">Editar Post</h1>
            <BlogPostForm post={post} />
        </div>
    );
}
