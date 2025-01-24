import { CircleMinus } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="lg:flex-1">
      <div className="p-8 py-16 text-center">
        <div className="mb-4 flex justify-center">
          <CircleMinus size={48} className="text-neutral-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Sayfa Bulunamadı</h2>
        <p className="text-neutral-500">
          Aradığınız sayfa taşınmış veya silinmiş olabilir
        </p>
      </div>
    </div>
  );
}
