"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { School, Settings, UserRoundSearch } from "lucide-react";
import { useAuth, useUserService, usePageTitle } from "@/hooks";
import { useEffect, useState } from "react";
import ProfileFeed from "@/components/feed/ProfileFeed";
import { universities } from "@/constants/universities";
import { Avatar } from "@/components/common";
import { Alert } from "@/components/ui";

const UserNotFound = () => {
  return (
    <div className="p-8 py-16 text-center">
      <div className="mb-4 flex justify-center">
        <UserRoundSearch size={48} className="text-neutral-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Böyle bir kullanıcı yok</h2>
      <p className="text-neutral-500">
        Kullanıcı adını kontrol edin ya da başka bir kullanıcı arayın.
      </p>
    </div>
  );
};

export default function ProfilePage() {
  const { username: loggedInUsername } = useAuth();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Extract username from /@username format
  const username = pathname.startsWith("/@")
    ? pathname.substring(2)
    : pathname.split("/")[1].substring(1);

  const { setTitle } = usePageTitle();
  const { userProfile, userProfileLoading, getUserProfile } = useUserService();

  useEffect(() => {
    setTitle("@" + username);

    // Fetch user profile data when the component mounts or username changes
    const fetchUserProfile = async () => {
      await getUserProfile(username);
      setIsLoading(false);
    };

    fetchUserProfile();
  }, [username, setTitle, getUserProfile]);

  // Determine if the current user is viewing their own profile
  const isOwnProfile = loggedInUsername === username;

  // Determine if the profile is private and not the user's own
  const isPrivateProfile = !isOwnProfile && userProfile?.isPrivate;

  // Get university info from profile data
  const universityId = userProfile?.universityId;
  const universityName = universityId
    ? universities.find((u) => u.id === universityId)?.name
    : null;

  if (userProfileLoading || isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!userProfile) {
    return <UserNotFound />;
  }

  return (
    <div className="lg:flex-1">
      <div className="p-6 sm:mb-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16">
            <Avatar username={username} size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                <span className="font-normal text-neutral-500">@</span>
                {username}
              </h1>
              {isOwnProfile && (
                <Link
                  href="/settings"
                  className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                >
                  <Settings size={18} />
                </Link>
              )}
            </div>

            <div className="flex items-center">
              {universityId && (
                <Link
                  href={`/university/${universityId}`}
                  className="inline-flex items-center text-sm text-neutral-500"
                >
                  <div className="mr-1.5 h-4 w-4">
                    <School size={16} />
                  </div>
                  <span className="hover:underline">
                    {universityName || "University"}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPrivateProfile ? (
        <div className="px-6">
          <Alert
            title="Gizli Profil"
            message="Bu kullanıcının profilini görüntüleyemezsiniz; gönderileri, anonim bir şekilde anasayfa ve üniversite sayfalarında yer alır."
            type="info"
          />
        </div>
      ) : (
        <ProfileFeed username={username} />
      )}
    </div>
  );
}
