import { Metadata } from "next";
import { BellOff } from "lucide-react";
import { NotificationList } from "@/components/common";

export const metadata: Metadata = {
  title: "Bildirimler",
};

const NoNotificaton = () => (
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

// const NotificationItem = () => (

export default function NotificationsPage() {
  return <></>;
}
