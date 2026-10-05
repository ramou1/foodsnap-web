"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RESTAURANTS } from "@/data/restaurants";
import { ProfileView } from "@/components/ProfileView";
import { PageFrame } from "@/components/PageFrame";

export default function RestaurantPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const restaurant = RESTAURANTS.find((item) => item.id === params.id);
  const [following, setFollowing] = useState(false);

  if (!restaurant) {
    return (
      <PageFrame className="flex flex-col items-center justify-center">
        <p>Restaurant not found</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 rounded-md bg-black px-6 py-2 text-white"
        >
          Go Back
        </button>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="bg-gray-100">
      <ProfileView
        username={restaurant.username}
        name={restaurant.name}
        bio={restaurant.bio}
        avatar={restaurant.avatar}
        posts={restaurant.posts}
        followers={restaurant.followers}
        following={restaurant.following}
        highlights={restaurant.highlights}
        postsList={restaurant.postsList}
        header={
          <div className="flex items-center border-b border-gray-200 bg-white px-4 py-3">
            <button type="button" onClick={() => router.back()} className="mr-4" aria-label="Voltar">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
          </div>
        }
        actions={
          <button
            type="button"
            onClick={() => setFollowing((current) => !current)}
            className="mb-4 mt-4 w-full rounded-md bg-violet-500 py-2 font-medium text-white"
          >
            {following ? "Following" : "Follow"}
          </button>
        }
      />
    </PageFrame>
  );
}
