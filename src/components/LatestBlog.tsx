"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { useLanguage } from "@/contexts/LanguageContext";

const LatestBlog = ({ posts }: { posts: BlogPost[] }) => {
    const { t } = useLanguage();

    if (posts.length === 0) return null;

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="flex flex-wrap items-end justify-between gap-4 mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                                {t("homeblog.tag")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                                {t("homeblog.title")}
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover transition-colors"
                        >
                            {t("homeblog.cta")}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <div className="flex flex-wrap gap-6">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block h-full bg-white border border-cplp-line rounded-lg overflow-hidden hover:shadow-card transition-shadow"
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
                                        <h3 className="text-lg font-bold text-cplp-navy mb-2 group-hover:text-cplp-blue transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-cplp-grey leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestBlog;
