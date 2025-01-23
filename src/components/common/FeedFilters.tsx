"use client";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Star } from "lucide-react";

interface FeedButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const FeedButton = ({ href, icon, label, isActive }: FeedButtonProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
        isActive
          ? "bg-white text-black shadow-sm dark:bg-neutral-700 dark:text-white"
          : "bg-none text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-800"
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function FeedFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get("filter") ?? null;

  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl justify-center px-4 py-3 sm:pb-0",
        className
      )}
    >
      <div className="_border _dark:border-neutral-700 inline-flex items-center justify-center gap-1 rounded-xl bg-neutral-100 p-1 backdrop-blur-sm dark:bg-neutral-800">
        <FeedButton
          href="?filter=newest"
          icon={<Clock className="h-4 w-4" />}
          label="En Yeniler"
          isActive={currentFilter === "newest" || !currentFilter}
        />
        <FeedButton
          href="?filter=popular"
          icon={<Star className="h-4 w-4" />}
          label="En Beğenilenler"
          isActive={currentFilter === "popular"}
        />
      </div>
    </div>
  );
}
