"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useApiLoading } from "@/hooks";

const ScrollRestoration: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoading = useApiLoading();
  const scrollPositions = useRef<Record<string, number>>({});
  const historyStack = useRef<string[]>([]);

  // Mevcut URL'yi oluştur
  const getCurrentPath = () => {
    return (
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    );
  };

  // Scroll olayını dinle ve pozisyonu kaydet
  useEffect(() => {
    const currentPath = getCurrentPath();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollPositions.current[currentPath] = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, searchParams]);

  // Sayfa yüklendiğinde ve API yüklemesi tamamlandığında scroll pozisyonunu geri yükle
  useEffect(() => {
    const currentPath = getCurrentPath();
    const savedPosition = scrollPositions.current[currentPath];

    // History stack'i güncelle
    const newStack = historyStack.current.filter((p) => p !== currentPath);
    newStack.push(currentPath);
    historyStack.current = newStack;

    // Ulaşılamayan sayfaların scroll pozisyonlarını temizle
    Object.keys(scrollPositions.current).forEach((key) => {
      if (!historyStack.current.includes(key)) {
        delete scrollPositions.current[key];
      }
    });

    // API yüklemesi tamamlanana kadar bekle, sonra scroll'u geri yükle
    if (!isLoading) {
      if (savedPosition !== undefined && savedPosition > 0) {
        window.scrollTo(0, savedPosition);
        requestAnimationFrame(() => {
          window.scrollTo(0, savedPosition);
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, searchParams, isLoading]);

  // Geri ve ileri navigasyonlarını yakala (tarayıcı butonları için)
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = getCurrentPath();
      const savedPosition = scrollPositions.current[currentPath];

      if (!isLoading) {
        if (savedPosition !== undefined && savedPosition > 0) {
          window.scrollTo(0, savedPosition);
          requestAnimationFrame(() => {
            window.scrollTo(0, savedPosition);
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isLoading]);

  return null;
};

export default ScrollRestoration;
