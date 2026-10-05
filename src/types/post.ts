import type { User } from "./user";

export interface Post {
  id: string;
  image: string;
  reposted?: boolean;
  height?: number;
  user: User | null;
  timestamp?: string;
  likes?: number;
  comments?: number;
  caption?: string;
  location?: string;
}
