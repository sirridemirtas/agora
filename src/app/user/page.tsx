"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  Mail as MessageIcon,
  School,
  Settings,
  UserRoundSearch,
} from "lucide-react";
import {
  useAdminService,
  useAuth,
  useLoginModal,
  usePageTitle,
  useUserService,
} from "@/hooks";
import { useEffect, useState } from "react";
import ProfileFeed from "@/components/feed/ProfileFeed";
import { universities } from "@/constants/universities";
import { Avatar, UserRoleBadge } from "@/components/common";
import { Alert, Button } from "@/components/ui";

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
  const { username: loggedInUsername, isLoggedIn, role } = useAuth();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<number | undefined>(
    undefined
  );
  const { openModal } = useLoginModal();
  const { updateUserRole, loading: updateRoleLoading } = useAdminService();

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

  useEffect(() => {
    if (userProfile?.role !== undefined) {
      setCurrentUserRole(userProfile.role);
    }
  }, [userProfile]);

  // Handle making a user a moderator
  const handleMakeModerator = async () => {
    if (
      confirm("Bu kullanıcıyı moderatör yapmak istediğinizden emin misiniz?")
    ) {
      const response = await updateUserRole(username, 1);
      if (response?.data) {
        setCurrentUserRole(1);
        //alert("Kullanıcı moderatör yapıldı.");
      } else {
        alert("İşlem sırasında bir hata oluştu.");
      }
    }
  };

  // Handle removing moderator status
  const handleRemoveModerator = async () => {
    if (
      confirm(
        "Bu kullanıcının moderatörlüğünü kaldırmak istediğinizden emin misiniz?"
      )
    ) {
      const response = await updateUserRole(username, 0);
      if (response?.data) {
        setCurrentUserRole(0);
        //alert("Kullanıcının moderatörlüğü kaldırıldı.");
      } else {
        alert("İşlem sırasında bir hata oluştu.");
      }
    }
  };

  // Determine if the current user is viewing their own profile
  const isOwnProfile = loggedInUsername === username;

  // Determine if the profile is private and not the user's own
  const isPrivateProfile = !isOwnProfile && userProfile?.isPrivate;

  // Get university info from profile data
  const universityId = userProfile?.universityId;
  const userRole =
    currentUserRole !== undefined ? currentUserRole : userProfile?.role;
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
      <div className="p-4 sm:p-6 sm:pb-4">
        <div className="flex items-center">
          <div className="mr-4 h-16 w-16">
            <Avatar username={username} size={16} />
          </div>
          <div className="w-full flex-1">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-xl font-semibold">
                  <span className="font-normal text-neutral-500">@</span>
                  {username}
                </h2>
                <UserRoleBadge role={userRole || 0} />
              </div>
              <div className="flex items-center gap-1">
                {isOwnProfile || (
                  <Link
                    href={isLoggedIn ? `/messages/${username}` : "#"}
                    onClick={
                      !isLoggedIn
                        ? (e) => {
                            e.preventDefault();
                            openModal();
                          }
                        : undefined
                    }
                    title="Mesaj Gönder"
                    tabIndex={-1}
                  >
                    <Button variant="secondary" icon={MessageIcon} />
                  </Link>
                )}
                {isOwnProfile && (
                  <Link href="/settings" title="Ayarlar" tabIndex={-1}>
                    <Button variant="secondary" icon={Settings} />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center">
              {universityId && (
                <Link
                  href={`/university/${universityId}`}
                  className="inline-flex items-start text-sm text-neutral-500"
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
      {role === 2 && userRole === 0 && (
        <div className="px-4 py-2 text-sm sm:px-6">
          <Button
            variant="secondary"
            onClick={handleMakeModerator}
            disabled={updateRoleLoading}
            className={clsx(updateRoleLoading && "cursor-progress")}
          >
            Moderatör Yap
          </Button>
        </div>
      )}
      {role === 2 && userRole === 1 && (
        <div className="px-4 py-2 text-sm sm:px-6">
          <Button
            variant="secondary"
            onClick={handleRemoveModerator}
            disabled={updateRoleLoading}
          >
            {updateRoleLoading ? "İşleniyor..." : "Möderatörlükten Çıkar"}
          </Button>
        </div>
      )}
      {isPrivateProfile ? (
        <div className="px-4 sm:px-6">
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
