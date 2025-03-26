"use client";
import { useEffect, useState } from "react";
import { BellOff } from "lucide-react";
import { useNotificationService } from "@/hooks/useNotificationService";
import { usePageTitle } from "@/hooks";
import { NotificationList } from "@/components/common";
import { Alert, Button } from "@/components/ui";

const NoNotifications = () => (
  <div className="lg:flex-1">
    <div className="p-8 py-16 text-center">
      <div className="mb-4 flex justify-center">
        <BellOff size={48} className="text-neutral-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Bildiriminiz bulunmuyor</h2>
      <p className="text-neutral-500">Yeni bildirimleriniz burada görünecek</p>
    </div>
  </div>
);

export default function NotificationsPage() {
  const { setTitle } = usePageTitle();
  const {
    notifications,
    notificationsLoading,
    getNotifications,
    markAllAsRead,
    markAllAsReadData,
    markAllAsReadError,
    markAllAsReadLoading,
    deleteAll,
    deleteAllData,
    deleteAllError,
    deleteAllLoading,
  } = useNotificationService();

  const [alertProps, setAlertProps] = useState<{
    show: boolean;
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  useEffect(() => {
    setTitle("Bildirimler");
  }, [setTitle]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  // Show success/error messages when markAllAsRead completes
  useEffect(() => {
    if (markAllAsReadData) {
      setAlertProps({
        show: true,
        type: "success",
        message: markAllAsReadData.message,
      });
      // Refresh notifications list to show updated read status
      getNotifications();
    } else if (markAllAsReadError) {
      setAlertProps({
        show: true,
        type: "error",
        message: markAllAsReadError.message || "An error occurred",
      });
    }
  }, [markAllAsReadData, markAllAsReadError, getNotifications]);

  // Show success/error messages when deleteAll completes
  useEffect(() => {
    if (deleteAllData) {
      setAlertProps({
        show: true,
        type: "success",
        message: deleteAllData.message,
      });
      // Refresh notifications list (will be empty)
      getNotifications();
    } else if (deleteAllError) {
      setAlertProps({
        show: true,
        type: "error",
        message: deleteAllError.message || "An error occurred",
      });
    }
  }, [deleteAllData, deleteAllError, getNotifications]);

  const handleMarkAllAsRead = async () => {
    const confirmed = window.confirm(
      "Tüm bildirimleri okundu olarak işaretlemek istediğinizden emin misiniz?"
    );
    if (confirmed) {
      await markAllAsRead();
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Tüm bildirimleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
    );
    if (confirmed) {
      await deleteAll();
    }
  };

  return (
    <div className="p-6">
      {alertProps && (
        <div className="mb-4">
          <Alert
            type={alertProps.type}
            message={alertProps.message}
            show={alertProps.show}
            onClose={() => setAlertProps(null)}
            autoClose={true}
          />
        </div>
      )}

      {notifications && notifications.length > 0 ? (
        <>
          <div className="mb-2 flex flex-row gap-2 text-sm">
            <Button
              variant="secondary"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadLoading}
            >
              Tümünü Okundu Olarak İşaretle
            </Button>
            <Button
              variant="secondary"
              onClick={handleDeleteAll}
              disabled={deleteAllLoading}
            >
              Tümünü Sil
            </Button>
          </div>
          <NotificationList />
        </>
      ) : (
        !notificationsLoading && <NoNotifications />
      )}
    </div>
  );
}
