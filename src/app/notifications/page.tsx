import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <Bell size={48} className="text-neutral-300" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Bildiriminiz bulunmuyor</h2>
        <p className="text-neutral-500">
          Yeni bildirimleriniz burada görünecek
        </p>
      </div>
    </div>
  );
}