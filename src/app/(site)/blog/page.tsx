import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import { getPublishedPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
    title: "Blog — CPLP CONNECT",
    description:
        "Notícias, artigos e novidades da CPLP CONNECT sobre transformação digital no espaço CPLP.",
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Blog"
                description="Notícias e artigos sobre transformação digital no espaço CPLP."
            />

            <section className="py-16 md:py-20 bg-cplp-bg flex-1">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {posts.length === 0 ? (
                            <p className="text-center text-cplp-grey py-12">
                                Ainda não há artigos publicados. Volta em breve.
                            </p>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-white border border-cplp-line rounded-lg overflow-hidden hover:shadow-card transition-shadow"
                                    >
                                        <div className="relative h-44 bg-cplp-navy/5">
                                            {post.coverImageUrl ? (
                                                <Image
                                                    src={post.coverImageUrl}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-cplp-navy/20 font-extrabold text-3xl">CPLP</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            {post.publishedAt && (
                                                <p className="text-xs text-cplp-grey mb-2">
                                                    {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            )}
                                            <h2 className="text-lg font-bold text-cplp-navy mb-2 group-hover:text-cplp-blue transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-cplp-grey leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-cplp-navy py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                            Não perca as próximas novidades
                        </h2>
                        <p className="text-white/70 mb-8">
                            Subscreva a newsletter e receba os novos artigos diretamente no seu email.
                        </p>
                        <NewsletterForm variant="dark" />
                    </div>
                </div>
            </section>
        </div>
    );
}
