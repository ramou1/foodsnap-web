import type { User } from "@/types/user";
import { DEFAULT_AVATAR, DEFAULT_IMAGE } from "./constants";
import { POSTS } from "./posts";

const highlights = [
  { id: "1", title: "Massas", image: DEFAULT_IMAGE },
  { id: "2", title: "Doces", image: DEFAULT_IMAGE },
  { id: "3", title: "Asiática", image: DEFAULT_IMAGE },
  { id: "4", title: "BBQ", image: DEFAULT_IMAGE },
];

function postById(id: string, extra?: Partial<(typeof POSTS)[number]>) {
  const post = POSTS.find((item) => item.id === id);
  if (!post) throw new Error(`Post ${id} não encontrado`);
  return { ...post, ...extra };
}

export const CURRENT_USER: User = {
  id: "i3j21",
  username: "maria_cozinha",
  name: "Maria Cozinha",
  bio: "Amo cozinhar e compartilhar receitas deliciosas! 🍝🍣🍕",
  avatar: DEFAULT_AVATAR,
  posts: 8,
  followers: 230,
  following: 200,
  isFollowing: false,
  isMe: true,
  postsList: [
    postById("1"),
    postById("2", {
      user: { id: "i3j21", username: "maria_cozinha", avatar: DEFAULT_AVATAR },
    }),
    postById("3", { reposted: true }),
    postById("4", { reposted: true }),
    postById("5", {
      user: { id: "i3j21", username: "maria_cozinha", avatar: DEFAULT_AVATAR },
      timestamp: "2025-04-07T18:00:00",
      likes: 95,
      comments: 12,
      caption: undefined,
    }),
    postById("6", {
      reposted: true,
      user: { id: "i3j26", username: "sweet_tooth", avatar: DEFAULT_AVATAR },
      timestamp: "2025-04-06T10:30:00",
      likes: 150,
      comments: 20,
      caption: undefined,
    }),
    postById("7", {
      user: { id: "i3j21", username: "maria_cozinha", avatar: DEFAULT_AVATAR },
      timestamp: "2025-04-05T15:45:00",
      likes: 78,
      comments: 5,
      caption: undefined,
    }),
    postById("8", {
      user: { id: "i3j21", username: "maria_cozinha", avatar: DEFAULT_AVATAR },
      timestamp: "2025-04-04T11:00:00",
      likes: 120,
      comments: 15,
      caption: undefined,
    }),
  ],
  highlights,
};

export const EXTRA_USERS: User[] = [
  {
    id: "user2",
    username: "foodie_chef",
    name: "Chef Mike",
    bio: "Chef profissional apaixonado por comida italiana! 🍝",
    avatar: DEFAULT_AVATAR,
    posts: 15,
    followers: 450,
    following: 180,
    isFollowing: false,
    isMe: false,
    postsList: POSTS.slice(8, 12),
    highlights,
  },
];

export function getUserById(id: string): User | undefined {
  if (id === CURRENT_USER.id) return CURRENT_USER;

  const extra = EXTRA_USERS.find((user) => user.id === id);
  if (extra) return extra;

  const posts = POSTS.filter((post) => post.user?.id === id);
  const author = posts[0]?.user;
  if (!author?.id) return undefined;

  return {
    id: author.id,
    username: author.username,
    name: author.username,
    avatar: author.avatar ?? DEFAULT_AVATAR,
    bio: "",
    posts: posts.length,
    followers: 0,
    following: 0,
    isFollowing: false,
    isMe: false,
    postsList: posts,
    highlights: [],
  };
}

export const SEARCH_USERS: User[] = [CURRENT_USER, ...EXTRA_USERS];
