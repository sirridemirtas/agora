"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoginModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const LoginModalContext = createContext<
  LoginModalContextValue | undefined
>(undefined);

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Pathname değiştiğinde modalı kapat
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalProvider;
