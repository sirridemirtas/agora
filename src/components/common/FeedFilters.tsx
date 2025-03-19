"use client";
import { useState } from "react";
import clsx from "clsx";
import { Clock, Star } from "lucide-react";
import { RadioGroup } from "@/components/ui";

type FilterValue = "newest" | "popular";

export default function FeedFilters({ className }: { className?: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("newest");

  const options = [
    {
      value: "newest" as FilterValue,
      icon: <Clock className="h-4 w-4" />,
      label: "En Yeniler",
    },
    {
      value: "popular" as FilterValue,
      icon: <Star className="h-4 w-4" />,
      label: "En Beğenilenler",
    },
  ];

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
  };

  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-2xl justify-center px-4 py-3 sm:pb-0",
        className
      )}
    >
      <RadioGroup
        value={activeFilter}
        onChange={handleFilterChange}
        options={options}
        variant="text"
      />
    </div>
  );
}
