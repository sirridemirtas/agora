"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function FeedPaginator() {
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
      className="flex flex-row flex-nowrap justify-center py-2"
    >
      <Link
        href={createPageURL(currentPage - 1)}
        className={clsx(
          "flex items-center justify-center gap-1 rounded-l-xl py-2 pl-2 pr-4",
          "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
          "dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
          "transition-colors",
          {
            "pointer-events-none opacity-50": currentPage <= 1,
          }
        )}
        aria-label="Önceki sayfa"
        aria-disabled={currentPage <= 1}
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
          "transition-colors"
        )}
        aria-label="Sonraki sayfa"
        role="button"
      >
        <span>İleri</span>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </nav>
  );
}
