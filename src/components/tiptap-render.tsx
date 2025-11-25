"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Heading } from "@tiptap/extension-heading";

interface TiptapRenderProps {
  content: string; // JSON string from Tiptap editor
}

export function TiptapRender({ content }: TiptapRenderProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: JSON.parse(content),
    editable: false, // Make it read-only
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none p-4",
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
