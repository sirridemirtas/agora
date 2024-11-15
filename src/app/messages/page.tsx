import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <MessageSquare size={48} className="text-neutral-300" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Henüz mesajınız yok</h2>
        <p className="text-neutral-500">
          Diğer kullanıcılarla mesajlaşmaya başlayın
        </p>
      </div>
    </div>
  );
}