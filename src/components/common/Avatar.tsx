"use client";
import clsx from "clsx";
import NiceAvatar from "react-nice-avatar";
import { UserRound as AnonIcon } from "lucide-react";

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
  return (
    <div
      className={clsx(
        size ? `h-${size} w-${size}` : "h-auto w-auto",
        "pointer-events-none flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
      )}
    >
      {username ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
          alt={`${username} kişisinin profil resmi`}
          className="h-full w-full object-cover"
        />
      ) : config ? (
        <NiceAvatar className="h-full w-full" {...config} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-neutral-600 dark:text-neutral-200">
          <AnonIcon />
        </div>
      )}
    </div>
  );
}
