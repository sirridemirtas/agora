"use client";
import { createContext, useState, useCallback, ReactNode } from "react";
import { SnackbarContainer, SnackbarType } from "@/components/ui/Snackbar";

type AddSnackbarOptions = {
  message: string;
  type?: SnackbarType;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoHideDuration?: number;
};

type SnackbarContextType = {
  addSnackbar: (options: AddSnackbarOptions) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbars, setSnackbars] = useState<
    Array<AddSnackbarOptions & { id: string }>
  >([]);

  const addSnackbar = useCallback((options: AddSnackbarOptions) => {
    const id = Math.random().toString(36).substring(7);
    setSnackbars((prev) => [...prev, { ...options, id }]);
  }, []);

  const handleClose = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      <SnackbarContainer items={snackbars} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
}
