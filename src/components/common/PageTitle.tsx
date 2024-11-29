"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "./Navigation";

const PageTitle = () => {
  const [title, setTitle] = useState("Microblog");
  const pathname = usePathname();

  useEffect(() => {
    const currentItem = navItems.find((item) => item.href === pathname);
    setTitle(currentItem ? currentItem.text : "Microblog");
  }, [pathname]);

  return <h1 className="text-md text-center font-semibold">{title}</h1>;
};

export default PageTitle;
