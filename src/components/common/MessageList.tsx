"use client";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/common";
import Link from "next/link";

const CustomLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

const ListItem = ({
  username,
  message,
  time,
}: {
  username: string;
  message: string;
  time: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer items-center gap-2 dark:border-neutral-800"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/messages/${username}`);
      }}
    >
      <CustomLink href={`/@${username}`}>
        <Avatar size={12} username={username} />
      </CustomLink>
      <div className="flex w-full flex-col border-b py-3 dark:border-neutral-800">
        <div className="flex w-full flex-row items-center justify-between">
          <CustomLink href={`/@${username}`}>
            <span className="font-semibold">
              <span className="opacity-50">@</span>
              <span className="hover:underline">{username}</span>
            </span>{" "}
          </CustomLink>
          <span className="text-gray -500 text-sm text-neutral-500">
            {time}
          </span>
        </div>
        <p className="truncate text-neutral-500">{message}</p>
      </div>
    </div>
  );
};

export default function MessageList() {
  return (
    <div className="flex flex-col">
      <ListItem username="johndoe" message="Hello there!" time="2m" />
      <ListItem username="janedoe" message="Hi!" time="3m" />
    </div>
  );
}
