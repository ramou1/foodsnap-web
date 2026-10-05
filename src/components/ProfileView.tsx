"use client";

import type { ReactNode } from "react";
import type { Highlight } from "@/types/user";
import type { Post } from "@/types/post";
import { PostGrid } from "./PostGrid";
import { DEFAULT_AVATAR } from "@/data/constants";

export function ProfileView({
  username,
  name,
  bio,
  avatar,
  posts = 0,
  followers = 0,
  following = 0,
  highlights = [],
  postsList = [],
  header,
  actions,
}: {
  username: string;
  name?: string;
  bio?: string;
  avatar?: string;
  posts?: number;
  followers?: number;
  following?: number;
  highlights?: Highlight[];
  postsList?: Post[];
  header?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="min-h-full bg-gray-100 md:bg-transparent">
      {header}
      <div className="bg-white px-4 pt-4 md:rounded-t-2xl md:px-8 md:pt-8">
        <div className="flex items-center md:gap-8">
          <img
            src={avatar || DEFAULT_AVATAR}
            alt={username}
            className="h-[86px] w-[86px] rounded-full border-2 border-gray-200 object-cover md:h-36 md:w-36"
          />
          <div className="ml-4 flex-1 md:ml-0">
            <p className="mb-1 text-xl font-bold md:text-3xl">{username}</p>
            <div className="mt-2 flex justify-between md:mt-4 md:justify-start md:gap-10">
              <Stat value={posts} label="posts" />
              <Stat value={followers} label="followers" />
              <Stat value={following} label="following" />
            </div>
          </div>
        </div>

        <div className="mt-3 md:mt-8 md:max-w-2xl">
          {name && <p className="font-medium md:text-lg">{name}</p>}
          {bio && <p className="mt-1 text-sm md:text-base">{bio}</p>}
        </div>

        <div className="md:mt-2 md:max-w-xl">{actions}</div>

        {highlights.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-4 md:gap-10 md:pb-8">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="flex shrink-0 flex-col items-center">
                <div className="rounded-full border-2 border-gray-300 p-1 md:p-1.5">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="h-[60px] w-[60px] rounded-full object-cover md:h-24 md:w-24"
                  />
                </div>
                <span className="mt-1 text-xs md:mt-2 md:text-sm">{highlight.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {postsList.length > 0 && <PostGrid posts={postsList} />}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
