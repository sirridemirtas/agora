"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";

interface AuthRedirectProps {
  protectedRoutes?: string[];
  publicRoutes?: string[];
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({
  protectedRoutes = ["/messages", "/notifications", "/profile", "/settings"],
  publicRoutes = ["/login", "/register"],
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!currentPath) return;

    // Giriş yapılmamışsa ve korumalı bir sayfadaysa login'e yönlendir
    if (!isLoggedIn && protectedRoutes.includes(currentPath)) {
      router.push("/login");
    } else if (isLoggedIn && publicRoutes.includes(currentPath)) {
      // Giriş yapılmışsa ve public sayfalardaysa anasayfaya yönlendir
      router.push("/");
    }
  }, [isLoggedIn, currentPath, protectedRoutes, publicRoutes, router]);

  return null; // Herhangi bir UI render etmez
};

export default AuthRedirect;
