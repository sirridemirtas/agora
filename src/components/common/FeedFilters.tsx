"use client";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Clock, Star } from "lucide-react";
import { RadioGroup } from "@/components/ui";

export default function FeedFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get("filter") ?? "newest";

  const options = [
    {
      value: "newest",
      icon: <Clock className="h-4 w-4" />,
      label: "En Yeniler",
      href: "?filter=newest",
    },
    {
      value: "popular",
      icon: <Star className="h-4 w-4" />,
      label: "En Beğenilenler",
      href: "?filter=popular",
    },
  ];

  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl justify-center px-4 py-3 sm:pb-0",
        className
      )}
    >
      <RadioGroup value={currentFilter} options={options} variant="text" />
    </div>
  );
}
