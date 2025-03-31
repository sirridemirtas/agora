"use client";
import { createContext, useState, ReactNode } from "react";

type PageTitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

export const PageTitleContext = createContext<PageTitleContextType>({
  title: "",
  setTitle: () => {},
});

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setPageTitle] = useState("");

  const setTitle = (title: string) => {
    document.title = "DedimKi | " + title;
    setPageTitle(title);
  };

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}
