import { MessageSquareOff } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="lg:flex-1">
      <div className="p-8 py-16 text-center">
        <div className="flex justify-center mb-4">
          <MessageSquareOff size={48} className="text-neutral-300" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Henüz mesajınız yok</h2>
        <p className="text-neutral-500">
          Diğer kullanıcılarla mesajlaşmaya başlayın
        </p>
      </div>
    </div>
  );
}
