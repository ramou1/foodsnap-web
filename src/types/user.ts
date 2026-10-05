import type { Post } from "./post";

export interface Highlight {
  id: string;
  title: string;
  image: string;
}

export interface User {
  id?: string;
  name?: string;
  username: string;
  avatar?: string;
  bio?: string;
  posts?: number;
  followers?: number;
  following?: number;
  isFollowing?: boolean;
  isMe?: boolean;
  postsList?: Post[];
  highlights?: Highlight[];
}
