import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPublishedPostBySlug } from "@/lib/data/blog";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);

    if (!post) {
        return { title: "Post não encontrado" };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            authors: post.authorName ? [post.authorName] : undefined,
            images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPublishedPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImageUrl || undefined,
        datePublished: post.publishedAt?.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            "@type": post.authorName ? "Person" : "Organization",
            name: post.authorName || "CPLP CONNECT",
        },
        publisher: {
            "@type": "Organization",
            name: "CPLP CONNECT",
            logo: {
                "@type": "ImageObject",
                url: "https://cplpconnect.pt/brand/png/cplpconnect-lockup-h.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://cplpconnect.pt/blog/${post.slug}`,
        },
    };

    return (
        <div className="min-h-screen flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="pt-32 pb-20 md:pt-40 md:pb-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {post.publishedAt && (
                            <p className="text-sm text-cplp-grey mb-3">
                                {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                                {post.authorName && ` · ${post.authorName}`}
                            </p>
                        )}

                        <h1 className="text-3xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mb-8">
                            {post.title}
                        </h1>

                        {post.coverImageUrl && (
                            <div className=" p-5 mx-auto justify-center  items-center flex rounded-lg overflow-hidden mb-10">
                                <Image src={post.coverImageUrl} alt={post.title} className="object-cover" priority height={240} width={240} />
                            </div>
                        )}

                        <MarkdownRenderer content={post.content} />
                    </div>
                </div>
            </article>
        </div>
    );
}
