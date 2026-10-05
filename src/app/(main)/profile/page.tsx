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
        <div className="mb-4 mt-4 flex justify-between gap-2">
          <Link
            href="/settings"
            className="w-1/2 rounded-md bg-gray-200 py-2 text-center text-sm font-medium"
          >
            edit profile
          </Link>
          <button
            type="button"
            className="w-1/2 rounded-md bg-violet-200 py-2 text-center text-sm font-medium"
          >
            share
          </button>
        </div>
      }
    />
  );
}
