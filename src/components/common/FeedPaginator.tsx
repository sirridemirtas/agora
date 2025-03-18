"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function FeedPaginator({
  prevDisabled = false,
  nextDisabled = false,
}: {
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", Math.max(1, pageNumber).toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Sayfalama"
      className="flex flex-col items-center gap-2 py-2"
    >
      {nextDisabled && (
        <span
          className={clsx(
            "text-sm text-neutral-600 dark:text-neutral-400",
            "rounded-md bg-neutral-100 px-4 py-1 dark:bg-neutral-900"
          )}
        >
          Son sayfaya ulaştınız
        </span>
      )}
      <div className="flex flex-row flex-nowrap justify-center">
        <Link
          href={createPageURL(currentPage - 1)}
          className={clsx(
            "flex items-center justify-center gap-1 rounded-l-xl py-2 pl-2 pr-4",
            "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
            "dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
            "transition-colors",
            {
              "pointer-events-none opacity-50":
                prevDisabled || currentPage <= 1,
            }
          )}
          aria-label="Önceki sayfa"
          aria-disabled={prevDisabled || currentPage <= 1}
          role="button"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span>Geri</span>
        </Link>

        <span
          className="w-[1px] bg-neutral-300 dark:bg-neutral-900"
          aria-hidden="true"
        ></span>

        <Link
          href={createPageURL(currentPage + 1)}
          className={clsx(
            "flex items-center justify-center gap-1 rounded-r-xl py-2 pl-4 pr-2",
            "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
            "dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
            "transition-colors",
            {
              "pointer-events-none opacity-50": nextDisabled,
            }
          )}
          aria-label="Sonraki sayfa"
          role="button"
          aria-disabled={nextDisabled}
        >
          <span>İleri</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
