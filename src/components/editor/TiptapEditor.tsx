// src/components/editor/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { EditorToolbar } from "./EditorToolbar"; // Import the toolbar component

interface TiptapEditorProps {
  content: any;
  onUpdate: (content: any) => void;
}

export default function TiptapEditor({ content, onUpdate }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable StarterKit's default Heading
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"], // Explicitly configure TextAlign
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      // Add custom extensions here later
    ],
    content: content || { type: 'doc', content: [{ type: 'paragraph' }] }, // Provide an empty document structure if content is null
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[400px] w-full max-w-none border p-4 rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
      },
    },
    immediatelyRender: false, // <-- Add this line
  });

  return (
    <div className="border rounded-md">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
