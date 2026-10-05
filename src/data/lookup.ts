import type { Post } from "@/types/post";
import { POSTS } from "./posts";
import { RESTAURANTS } from "./restaurants";

export function getPostById(id: string): Post | undefined {
  return (
    POSTS.find((post) => post.id === id) ??
    RESTAURANTS.flatMap((restaurant) => restaurant.postsList).find(
      (post) => post.id === id
    )
  );
}
