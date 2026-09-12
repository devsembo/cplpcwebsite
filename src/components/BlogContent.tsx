import MarkdownRenderer from "@/components/MarkdownRenderer";

// Posts antigos foram escritos em Markdown; os novos usam o editor visual
// (HTML). Mantemos os dois para não partir o conteúdo já publicado.
export default function BlogContent({ content, format }: { content: string; format: string }) {
    if (format === "html") {
        return <div className="article-content max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <MarkdownRenderer content={content} />;
}
