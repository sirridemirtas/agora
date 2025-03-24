"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NiceAvatar from "react-nice-avatar";
import { UserRound as AnonIcon } from "lucide-react";
import { useAvatar } from "@/hooks";

export type AvatarConfig = {
  faceColor: string;
  earSize: "small" | "big";
  hairStyle: "normal" | "thick" | "mohawk" | "womanLong" | "womanShort";
  hairColor: string;
  hatStyle: "none" | "beanie" | "turban";
  hatColor: string;
  eyeStyle: "circle" | "oval" | "smile";
  glassesStyle: "none" | "round" | "square";
  noseStyle: "short" | "long" | "round";
  mouthStyle: "laugh" | "smile" | "peace";
  shirtStyle: "hoody" | "short" | "polo";
  shirtColor: string;
  bgColor: string;
};

export default function AvatarPreview({
  config,
  username,
  size,
}: {
  config?: AvatarConfig;
  username?: string;
  size?: number;
}) {
  const { getUserAvatar } = useAvatar();
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | undefined>(
    config
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Directly use provided config if available
    if (config) {
      setAvatarConfig(config);
      return;
    }

    // Otherwise fetch avatar if username is provided
    if (username) {
      fetchAvatarConfig();
    }
  }, [username, config]);

  const fetchAvatarConfig = async () => {
    if (!username) return;

    setIsLoading(true);
    try {
      const response = await getUserAvatar(username);
      if (response.data) {
        // Direct assignment since the API now returns just the avatar config
        setAvatarConfig(response.data);
      } else {
        setAvatarConfig(undefined);
      }
    } catch (error) {
      console.error("Failed to load avatar:", error);
      setAvatarConfig(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        size ? `h-${size} w-${size}` : "h-full w-full",
        "pointer-events-none flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
      )}
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center text-neutral-600 dark:text-neutral-200">
          <div className="h-full w-full animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>
      ) : avatarConfig ? (
        // Use NiceAvatar when we have config (either from props or API)
        <NiceAvatar className="h-full w-full" {...avatarConfig} />
      ) : (
        // Show anonymous icon when no avatar config is available
        <div className="flex h-full w-full items-center justify-center text-neutral-600 dark:text-neutral-200">
          <AnonIcon />
        </div>
      )}
    </div>
  );
}
