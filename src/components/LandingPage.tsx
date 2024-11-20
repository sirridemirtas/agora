"use client";
import { MessageCircle, Shield, School, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AuthModal from "./AuthModal";

export default function Home() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  return (
    <main className="w-full">
      <AuthModal mode={mode as "login" | "register"} />
      <section className="px-4 pt-20 pb-16 text-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
            Özgürce Paylaş, Anonim Kal
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Üniversite öğrencileri için güvenli ve anonim mikroblog platformu
          </p>
        </div>
      </section>
      <section className="px-4 py-16 bg-white dark:bg-neutral-900 sm:rounded-xl sm:shadow-sm">
        <div className="max-w-md mx-auto ">
          <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 mb-12">
            Özellikler
          </h2>
          <div className="grid gap-8">
            <Feature
              icon={<Shield className="w-6 h-6 text-blue-700" />}
              title="Tam Anonimlik"
              description="Kimliğinizi gizli tutarak düşüncelerinizi özgürce paylaşın"
            />
            <Feature
              icon={<School className="w-6 h-6 text-blue-700" />}
              title="Üniversite Toplulukları"
              description="Kendi üniversitenizin özel sayfasında paylaşım yapın"
            />
            <Feature
              icon={<MessageCircle className="w-6 h-6 text-blue-700" />}
              title="Mesajlaşma"
              description="Diğer kullanıcılarla özel mesajlar üzerinden iletişim kurun"
            />
            <Feature
              icon={<Lock className="w-6 h-6 text-blue-700" />}
              title="Gizlilik Kontrolü"
              description="Açık veya gizli mod arasında dilediğiniz zaman geçiş yapın"
            />
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 mb-12">
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
      <footer className="px-4 py-8 text-sm text-center">
        <div className="max-w-md mx-auto">
          <p className="text-gray-500">© 2024 Tüm hakları saklıdır</p>
        </div>
      </footer>
    </main>
  );
}

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
      <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {description}
        </p>
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
      <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-semibold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
