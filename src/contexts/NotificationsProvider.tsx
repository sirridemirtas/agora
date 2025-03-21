"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { useMessageService } from "@/hooks/useMessageService";
import { useAuth } from "@/hooks";

interface NotificationsContextType {
  unreadMessageCount: number;
  notificationCount: number;
  refreshCounts: () => Promise<void>;
}

export const NotificationsContext = createContext<NotificationsContextType>({
  unreadMessageCount: 0,
  notificationCount: 0,
  refreshCounts: async () => {},
});

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const { unreadCount, getUnreadCount } = useMessageService();
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  const refreshCounts = useCallback(async () => {
    if (isLoggedIn) {
      try {
        // Fetch unread message count
        await getUnreadCount();

        // In the future, fetch notification count here
        // For now, we'll use a dummy value
        setNotificationCount(0);
      } catch (error) {
        console.error("Failed to refresh notification counts:", error);
      }
    }
  }, [getUnreadCount, isLoggedIn]);

  // Update local state when unreadCount changes
  useEffect(() => {
    setUnreadMessageCount(unreadCount);
  }, [unreadCount]);

  // Refresh counts when path changes or login state changes
  useEffect(() => {
    refreshCounts();
  }, [pathname, isLoggedIn, refreshCounts]);

  // Set up periodic refresh (every 30 seconds)
  useEffect(() => {
    if (!isLoggedIn) return;

    const intervalId = setInterval(() => {
      refreshCounts();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn, refreshCounts]);

  return (
    <NotificationsContext.Provider
      value={{
        unreadMessageCount,
        notificationCount,
        refreshCounts,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
