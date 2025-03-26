import { useApi } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { 
  NotificationService, 
  Notification, 
  UnreadCountResponse,
  MarkAllAsReadResponse,
  DeleteAllResponse 
} from '@/services/NotificationService';

export const useNotificationService = () => {
  // Create notificationService instance once with useMemo
  const notificationService = useMemo(() => new NotificationService(), []);
  
  // Memoize bound API functions
  const getNotificationsFn = useMemo(() => 
    notificationService.getNotifications.bind(notificationService), 
  [notificationService]);
  
  const getUnreadCountFn = useMemo(() => 
    notificationService.getUnreadCount.bind(notificationService), 
  [notificationService]);
  
  const markAsReadFn = useMemo(() => 
    notificationService.markAsRead.bind(notificationService), 
  [notificationService]);

  const markAllAsReadFn = useMemo(() => 
    notificationService.markAllAsRead.bind(notificationService), 
  [notificationService]);
  
  const deleteAllFn = useMemo(() => 
    notificationService.deleteAll.bind(notificationService), 
  [notificationService]);
  
  // Get all notifications
  const {
    data: notifications,
    error: notificationsError,
    loading: notificationsLoading,
    execute: executeGetNotifications,
  } = useApi<Notification[], []>(getNotificationsFn);

  // Get unread count
  const {
    data: unreadCountData,
    error: unreadCountError,
    loading: unreadCountLoading,
    execute: executeGetUnreadCount,
  } = useApi<UnreadCountResponse, []>(getUnreadCountFn);

  // Mark as read
  const {
    error: markAsReadError,
    loading: markAsReadLoading,
    execute: executeMarkAsRead,
  } = useApi<void, [string]>(markAsReadFn);

  // Mark all as read
  const {
    data: markAllAsReadData,
    error: markAllAsReadError,
    loading: markAllAsReadLoading,
    execute: executeMarkAllAsRead,
  } = useApi<MarkAllAsReadResponse, []>(markAllAsReadFn);

  // Delete all notifications
  const {
    data: deleteAllData,
    error: deleteAllError,
    loading: deleteAllLoading,
    execute: executeDeleteAll,
  } = useApi<DeleteAllResponse, []>(deleteAllFn);

  // Callback wrappers
  const getNotifications = useCallback(async () => {
    return executeGetNotifications();
  }, [executeGetNotifications]);

  const getUnreadCount = useCallback(async () => {
    return executeGetUnreadCount();
  }, [executeGetUnreadCount]);

  const markAsRead = useCallback(async (notificationId: string) => {
    return executeMarkAsRead(notificationId);
  }, [executeMarkAsRead]);

  const markAllAsRead = useCallback(async () => {
    return executeMarkAllAsRead();
  }, [executeMarkAllAsRead]);

  const deleteAll = useCallback(async () => {
    return executeDeleteAll();
  }, [executeDeleteAll]);

  return {
    // Notifications list data and operations
    notifications,
    notificationsError,
    notificationsLoading,
    getNotifications,
    
    // Unread count data and operations
    unreadCount: unreadCountData?.unreadCount || 0,
    unreadCountError,
    unreadCountLoading,
    getUnreadCount,
    
    // Mark as read operations
    markAsReadError,
    markAsReadLoading,
    markAsRead,

    // Mark all as read operations
    markAllAsReadData,
    markAllAsReadError,
    markAllAsReadLoading,
    markAllAsRead,
    
    // Delete all operations
    deleteAllData,
    deleteAllError,
    deleteAllLoading,
    deleteAll,
  };
};
