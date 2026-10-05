"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImageIcon, LoaderCircle, Send, Trash2, X } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";

export default function CreatePostPage() {
  const router = useRouter();
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  function readFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function handlePost() {
    if (!image) {
      window.alert("Por favor, selecione uma imagem para continuar");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      window.alert("success!\nposted!");
      router.back();
    }, 1500);
  }

  return (
    <PageFrame>
      <div className="flex items-center border-b border-gray-200 px-4 py-3">
        <button type="button" onClick={() => router.back()} aria-label="Fechar" className="mr-4">
          <X size={24} />
        </button>
        <h1 className="text-lg font-semibold">new post</h1>
      </div>

      <div className="p-4">
        <p className="mb-2 text-lg font-medium text-gray-800">image</p>

        {image ? (
          <div className="relative mb-4">
            <img src={image} alt="Prévia" className="h-64 w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute right-2 top-2 rounded-full bg-gray-800/60 p-2 text-white"
              aria-label="Remover imagem"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ) : (
          <div className="mb-4 flex h-64 flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-400">
            <ImageIcon size={64} />
            <p className="mt-2 text-gray-500">no image selected</p>
          </div>
        )}

        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex flex-1 items-center justify-center rounded-lg bg-gray-200 py-3 font-medium text-gray-700"
          >
            <ImageIcon size={20} />
            <span className="ml-2">gallery</span>
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex flex-1 items-center justify-center rounded-lg bg-gray-200 py-3 font-medium text-gray-700"
          >
            <Camera size={20} />
            <span className="ml-2">camera</span>
          </button>
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => readFile(event.target.files?.[0])}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => readFile(event.target.files?.[0])}
          />
        </div>

        <label className="mb-2 block text-lg font-medium text-gray-800">description</label>
        <input
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          maxLength={50}
          placeholder="Ex: Pizza Margherita, Café da manhã especial..."
          className="mb-4 w-full rounded-lg bg-gray-100 p-3"
        />

        <label className="mb-2 block text-sm text-gray-500">location (optional)</label>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          maxLength={50}
          placeholder="Ex: São Paulo, SP"
          className="mb-4 w-full rounded-lg bg-gray-100 p-3"
        />

        <label className="mb-2 block text-sm text-gray-500">tags (optional)</label>
        <input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          maxLength={50}
          placeholder="Ex: food, pizza, asian"
          className="mb-4 w-full rounded-lg bg-gray-100 p-3"
        />

        <button
          type="button"
          onClick={handlePost}
          disabled={!image || loading}
          className={`mt-6 flex w-full items-center justify-center rounded-lg py-4 text-xl font-medium ${
            image ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Send size={18} />
              <span className="ml-2">post</span>
            </>
          )}
        </button>
      </div>
    </PageFrame>
  );
}
