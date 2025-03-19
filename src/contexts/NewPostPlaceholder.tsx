"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"; // useEffect eklendi
import { usePathname } from "next/navigation";
import { Post } from "@/types";

export interface NewPostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  clearPosts: () => void;
}

export const NewPostContext = createContext<NewPostContextType | undefined>(
  undefined
);

export function useNewPost() {
  const context = useContext(NewPostContext);
  if (context === undefined) {
    throw new Error("useNewPost must be used within a NewPostProvider");
  }
  return context;
}

interface NewPostProviderProps {
  children: ReactNode;
}

export function NewPostProvider({ children }: NewPostProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const pathname = usePathname(); // pathname'i alıyoruz

  // pathname değiştiğinde posts'u sıfırla
  useEffect(() => {
    setPosts([]); // posts'u boş bir diziyle resetle
  }, [pathname]); // pathname bağımlılığı

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  const clearPosts = () => {
    setPosts([]);
  };

  return (
    <NewPostContext.Provider value={{ posts, addPost, clearPosts }}>
      {children}
    </NewPostContext.Provider>
  );
}
