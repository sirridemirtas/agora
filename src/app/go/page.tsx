"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { universities } from "@/constants/universities";
import { usePageTitle } from "@/hooks";
import { Input } from "@/components/ui";

// Helper function to remove diacritics (accent marks)
const removeDiacritics = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/gi, "c")
    .replace(/ş/gi, "s")
    .replace(/ı/gi, "i")
    .replace(/ğ/gi, "g")
    .replace(/ü/gi, "u")
    .replace(/ö/gi, "o");
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUniversities = universities.filter((university) =>
    removeDiacritics(university.name.toLowerCase()).includes(
      removeDiacritics(searchQuery.toLowerCase())
    )
  );

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Üniversiteler");
  }, [setTitle]);

  return (
    <div className="p-6 text-sm md:text-base">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Üniversite adı girin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sticky top-0 w-full"
          autoFocus
          draggable={false}
          autoComplete="off"
        />
      </div>

      <div className="mt-4">
        {filteredUniversities.map((university) => (
          <Link
            key={university.id || university.name}
            href={`/university/${university.id || university.name}`}
            className={
              "flex min-h-10 w-full flex-row items-center border-b p-2 outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            }
          >
            {university.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
