// src/components/editor/ImageUploadButton.tsx
"use client";

import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { createClient } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_POST_AUTHOR_ID } from "@/lib/constants";
import imageCompression from 'browser-image-compression';

interface ImageUploadButtonProps {
  editor: Editor | null;
}

export function ImageUploadButton({ editor }: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Step 1: Client-side image compression
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // (max file size in MB)
        maxWidthOrHeight: 1920, // compressed image's max width or height
        useWebWorker: true,
      });

      const fileExtension = file.name.split(".").pop();
      const fileName = `${uuidv4()}_${Date.now()}.${fileExtension}`;
      const filePath = `images/${ADMIN_POST_AUTHOR_ID}/${fileName}`;

      // Step 2: Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }


      // Step 3: Get public URL (or signed URL for private buckets)
      // For simplicity, we are getting a public URL. For private buckets,
      // you'd generate a signed URL on the server-side.
      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        editor?.chain().focus().setImage({ src: publicUrlData.publicUrl }).run();
      } else {
        throw new Error("Could not get public URL for the uploaded image.");
      }
    } catch (error: any) {
      alert(`Image upload failed: ${error.message}`);
      console.error("Image upload error:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading || !editor}
        variant="ghost"
        size="icon"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}
