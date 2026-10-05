import type { Post } from "./post";
import type { Highlight } from "./user";

export interface Restaurant {
  id: string;
  name: string;
  username: string;
  image: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  postsList: Post[];
  highlights: Highlight[];
}
