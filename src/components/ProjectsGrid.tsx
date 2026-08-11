// src/components/ProjectsGrid.tsx
// Grelha de projetos reutilizável — usada na homepage (Projects.tsx) e na
// página /projetos, para garantir que os dados nunca divergem.
"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Project } from "@prisma/client";

// Motivo de pontos com as cores da marca, replicando o mark do logo.
// Usado como fallback para projetos sem imagem definida no admin.
const dotPattern = (colorA: string, colorB: string) => ({
    backgroundColor: "#F5F8FC",
    backgroundImage: `radial-gradient(${colorA} 1.5px, transparent 1.5px), radial-gradient(${colorB} 1.5px, transparent 1.5px)`,
    backgroundSize: "18px 18px",
    backgroundPosition: "0 0, 9px 9px",
});

const ProjectPlaceholder = ({ project }: { project: Project }) => {
    if (project.comingSoon) {
        return (
            <div
                className="w-full h-full flex items-center justify-center border-2 border-dashed border-cplp-line"
                style={dotPattern("rgba(90,100,120,0.18)", "rgba(90,100,120,0.10)")}
            >
                <span className="text-cplp-grey font-semibold tracking-wide uppercase text-xs bg-white/80 px-3 py-1.5 rounded-md">
                    Em breve
                </span>
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={dotPattern(project.accentFrom, project.accentTo)}
        >
            <span className="text-2xl md:text-3xl font-extrabold text-cplp-navy tracking-tight bg-white/85 px-4 py-2 rounded-md">
                {project.title}
            </span>
        </div>
    );
};

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <Card
                        className={`overflow-hidden border bg-white rounded-lg h-full ${
                            project.comingSoon
                                ? "border-cplp-line opacity-80"
                                : "border-cplp-line hover:shadow-card transition-shadow"
                        }`}
                    >
                        <div className="relative h-48 overflow-hidden">
                            {project.imageUrl ? (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            ) : (
                                <ProjectPlaceholder project={project} />
                            )}
                        </div>

                        <div className="p-6">
                            <Badge variant="outline" className="mb-3 text-cplp-blue border-cplp-blue/30 bg-cplp-blue/[0.05]">
                                {project.category}
                            </Badge>

                            <h3 className="text-lg font-bold text-cplp-navy mb-2">
                                {project.title}
                            </h3>

                            <p className="text-sm text-cplp-grey mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            {project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="text-xs text-cplp-grey border-cplp-line"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default ProjectsGrid;
