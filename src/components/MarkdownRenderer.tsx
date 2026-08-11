import ReactMarkdown, { type Components } from "react-markdown";

const markdownComponents: Components = {
    h1: ({ node, ...props }) => (
        <h1 className="text-3xl font-extrabold text-cplp-navy tracking-tight mt-8 mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 className="text-2xl font-bold text-cplp-navy tracking-tight mt-8 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 className="text-xl font-bold text-cplp-navy tracking-tight mt-6 mb-2" {...props} />
    ),
    p: ({ node, ...props }) => <p className="text-cplp-ink leading-relaxed mb-4" {...props} />,
    a: ({ node, ...props }) => (
        <a className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2" {...props} />
    ),
    ul: ({ node, ...props }) => (
        <ul className="list-disc list-inside space-y-1 mb-4 text-cplp-ink" {...props} />
    ),
    ol: ({ node, ...props }) => (
        <ol className="list-decimal list-inside space-y-1 mb-4 text-cplp-ink" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-cplp-blue/30 pl-4 italic text-cplp-grey mb-4" {...props} />
    ),
    code: ({ node, ...props }) => (
        <code className="bg-cplp-bg text-cplp-navy px-1.5 py-0.5 rounded text-sm" {...props} />
    ),
    img: ({ node, ...props }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-lg my-4 max-w-full" {...props} alt={props.alt ?? ""} />
    ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="max-w-none">
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
    );
}
