"use client";
import { useEffect } from "react";
import path from "path";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navItems } from "./Navigation";
import { usePageTitle } from "@/hooks";
import { universities } from "@/constants/universities";

const PageTitle = () => {
  const pathname = usePathname();
  const { title, setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(navItems.find((item) => item.href === pathname)?.text || "404");

    if (pathname.startsWith("/post/")) {
      setTitle("Gönderi Detayı");
    } else if (pathname.startsWith("/university/")) {
      const universityId = path.basename(pathname);

      setTitle(
        universities.find((item) => item.id === universityId)?.name ||
          "Üniversite"
      );
    }
  }, [pathname, setTitle]);

  return (
    <h1 className={clsx("text-center text-sm font-semibold sm:text-base")}>
      {title}
    </h1>
  );
};

export default PageTitle;
