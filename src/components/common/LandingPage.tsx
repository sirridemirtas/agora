"use client";
import { Lock, MessageCircle, School, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/common";

const Home = () => {
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode") ?? "login";
  return (
    <main className="w-full">
      <AuthModal mode={mode as "login" | "register"} />
      <section className="px-4 pb-16 pt-20 text-center">
        <div className="mx-auto w-full max-w-md">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900">
            Özgürce Paylaş, Anonim Kal
          </h1>
          <p className="mb-8 text-lg text-neutral-600">
            Üniversite öğrencileri için güvenli ve anonim mikroblog platformu
          </p>
        </div>
      </section>
      <section className="bg-white px-4 py-16 sm:rounded-xl sm:shadow-sm">
        <div className="mx-auto max-w-md">
          <h2 className="mb-12 text-center text-2xl font-bold text-neutral-900">
            Özellikler
          </h2>
          <div className="grid gap-8">
            <Feature
              icon={<Shield className="h-6 w-6 text-blue-700" />}
              title="Tam Anonimlik"
              description="Kimliğinizi gizli tutarak düşüncelerinizi özgürce paylaşın"
            />
            <Feature
              icon={<School className="h-6 w-6 text-blue-700" />}
              title="Üniversite Toplulukları"
              description="Kendi üniversitenizin özel sayfasında paylaşım yapın"
            />
            <Feature
              icon={<MessageCircle className="h-6 w-6 text-blue-700" />}
              title="Mesajlaşma"
              description="Diğer kullanıcılarla özel mesajlar üzerinden iletişim kurun"
            />
            <Feature
              icon={<Lock className="h-6 w-6 text-blue-700" />}
              title="Gizlilik Kontrolü"
              description="Açık veya gizli mod arasında dilediğiniz zaman geçiş yapın"
            />
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-md">
          <h2 className="mb-12 text-center text-2xl font-bold text-neutral-900">
            Nasıl Çalışır?
          </h2>
          <div className="space-y-8">
            <Step
              number="1"
              title="Hesap Oluştur"
              description="Kullanıcı adını seç ve üniversiteni belirt"
            />
            <Step
              number="2"
              title="Gizlilik Modunu Seç"
              description="Açık veya gizli modda paylaşım yap"
            />
            <Step
              number="3"
              title="Paylaşımda Bulun"
              description="Düşüncelerini özgürce paylaş ve tartışmalara katıl"
            />
          </div>
        </div>
      </section>
      <footer className="px-4 py-8 text-center text-sm">
        <div className="mx-auto max-w-md">
          <p className="text-gray-500">© 2024 Tüm hakları saklıdır</p>
        </div>
      </footer>
    </main>
  );
};

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">{icon}</div>
      <div>
        <h3 className="mb-1 font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 font-semibold text-white">
        {number}
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

export default Home;
