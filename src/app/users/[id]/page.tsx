"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getUserById } from "@/data/users";
import { ProfileView } from "@/components/ProfileView";
import { PageFrame } from "@/components/PageFrame";

export default function UserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const found = getUserById(params.id);
  const [following, setFollowing] = useState(found?.isFollowing ?? false);

  if (!found) {
    return (
      <PageFrame className="flex flex-col items-center justify-center bg-gray-100">
        <p className="mb-4 text-lg">Usuário não encontrado</p>
        <button type="button" onClick={() => router.back()} className="rounded-md bg-black px-6 py-2 text-white">
          Voltar
        </button>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="bg-gray-100">
      <ProfileView
        username={found.username}
        name={found.name}
        bio={found.bio}
        avatar={found.avatar}
        posts={found.posts}
        followers={found.followers}
        following={found.following}
        highlights={found.highlights}
        postsList={found.postsList}
        header={
          <div className="flex items-center border-b border-gray-200 bg-white px-4 py-3">
            <button type="button" onClick={() => router.back()} className="mr-4" aria-label="Voltar">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{found.username}</h1>
          </div>
        }
        actions={
          <button
            type="button"
            onClick={() => setFollowing((current) => !current)}
            className="mb-4 mt-4 w-full rounded-md bg-violet-500 py-2 font-medium text-white"
          >
            {following ? "Seguindo" : "Seguir"}
          </button>
        }
      />
    </PageFrame>
  );
}
