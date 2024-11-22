import { Bell, BellOff } from "lucide-react";
import { Card } from "@/components/ui";
import { PageTitle } from "@/components/common";

export default function NotificationsPage() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Bildirimler" icon={Bell} />
      <Card>
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <BellOff size={48} className="text-neutral-300" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Bildiriminiz bulunmuyor
          </h2>
          <p className="text-neutral-500">
            Yeni bildirimleriniz burada görünecek
          </p>
        </div>
      </Card>
    </div>
  );
}
