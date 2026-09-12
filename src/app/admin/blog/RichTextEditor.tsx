"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Undo2,
    Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarButton({
    onClick,
    active,
    children,
    label,
}: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={cn(
                "p-2 rounded-md hover:bg-white transition-colors cursor-pointer",
                active ? "bg-white text-cplp-blue shadow-sm" : "text-cplp-grey",
            )}
        >
            {children}
        </button>
    );
}

export default function RichTextEditor({
    initialContent,
    onChangeHtml,
}: {
    initialContent?: string;
    onChangeHtml: (html: string) => void;
}) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-cplp-blue underline" } }),
            Placeholder.configure({ placeholder: "Escreve o conteúdo do artigo..." }),
        ],
        content: initialContent || "",
        editorProps: {
            attributes: {
                class: "article-content min-h-[22rem] max-h-[34rem] overflow-y-auto px-4 py-3 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => onChangeHtml(editor.getHTML()),
    });

    // Garante que o form recebe o HTML inicial mesmo sem o utilizador escrever nada.
    useEffect(() => {
        if (editor) onChangeHtml(editor.getHTML());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    const setLink = () => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href as string | undefined;
        const url = window.prompt("URL do link:", previousUrl ?? "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    if (!editor) return null;

    return (
        <div className="border border-cplp-line rounded-md overflow-hidden bg-white">
            <div className="flex flex-wrap items-center gap-1 border-b border-cplp-line p-2 bg-cplp-bg">
                <ToolbarButton label="Negrito" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <BoldIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton label="Itálico" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <ItalicIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Título"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton label="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Lista numerada"
                    active={editor.isActive("orderedList")}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton label="Citação" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Quote className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
                    <LinkIcon className="w-4 h-4" />
                </ToolbarButton>
                <div className="w-px h-5 bg-cplp-line mx-1" />
                <ToolbarButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
                    <Undo2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton label="Refazer" onClick={() => editor.chain().focus().redo().run()}>
                    <Redo2 className="w-4 h-4" />
                </ToolbarButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
