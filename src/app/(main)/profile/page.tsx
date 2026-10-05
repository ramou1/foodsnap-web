import Link from "next/link";
import { CURRENT_USER } from "@/data/users";
import { ProfileView } from "@/components/ProfileView";

export default function ProfilePage() {
  const user = CURRENT_USER;

  return (
    <ProfileView
      username={user.username}
      name={user.name}
      bio={user.bio}
      avatar={user.avatar}
      posts={user.posts}
      followers={user.followers}
      following={user.following}
      highlights={user.highlights}
      postsList={user.postsList}
      actions={
        <div className="mb-4 mt-4 flex gap-3 md:mb-8 md:mt-6 md:gap-4">
          <Link
            href="/settings"
            className="flex-1 rounded-lg bg-gray-200 py-2.5 text-center text-sm font-medium md:py-3 md:text-base"
          >
            edit profile
          </Link>
          <button
            type="button"
            className="flex-1 rounded-lg bg-violet-200 py-2.5 text-center text-sm font-medium md:py-3 md:text-base"
          >
            share
          </button>
        </div>
      }
    />
  );
}
