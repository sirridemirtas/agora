"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={createPageURL(i)}
          className={clsx(
            "relative inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
            currentPage === i
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
          )}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </Link>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <span key="start-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
      pages.unshift(
        <Link
          key={1}
          href={createPageURL(1)}
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          1
        </Link>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
      pages.push(
        <Link
          key={totalPages}
          href={createPageURL(totalPages)}
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-between px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <Link
          href={createPageURL(Math.max(1, currentPage - 1))}
          className={clsx(
            "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
            currentPage <= 1 && "pointer-events-none opacity-50"
          )}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </Link>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
          <div className="flex gap-x-1">{renderPageNumbers()}</div>
        </div>

        <Link
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          className={clsx(
            "relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
            currentPage >= totalPages && "pointer-events-none opacity-50"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
