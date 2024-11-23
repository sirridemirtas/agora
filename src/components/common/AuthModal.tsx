"use client";
import { InvalidEvent } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Lock, School } from "lucide-react";
import { Button, Combobox, Input } from "@/components/ui";
import { universities } from "@/constants/universities";

interface AuthLandingProps {
  mode: "login" | "register";
}

const AuthModal: React.FC<AuthLandingProps> = ({ mode }) => {
  const router = useRouter();
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {isLogin ? "Tekrar Hoş Geldiniz!" : "Aramıza Katılın!"}
          </h1>
          <p className="text-lg text-gray-600">
            {isLogin
              ? "Hesabınıza giriş yaparak tüm özelliklerden faydalanabilirsiniz."
              : "Hemen kayıt olun ve topluluğumuzun bir parçası olun."}
          </p>
        </div>

        {/* Sağ Panel: Form */}
        <div className="bg-white p-6 sm:rounded-xl sm:shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </h2>

          <form className="space-y-4">
            {!isLogin && (
              <>
                <Input
                  icon={AtSign}
                  label="Kullanıcı Adı"
                  placeholder="Kullanıcı adınızı seçin"
                  pattern="[A-Za-z]+"
                  onInvalid={(e: InvalidEvent<HTMLInputElement>) => {
                    e.target.setCustomValidity(
                      "Sadece harf karakterleri kullanabilirsiniz"
                    );
                  }}
                  autoFocus
                  required
                />

                <Combobox
                  icon={School}
                  label="Üniversite"
                  placeholder="Üniversitenizi seçin"
                  options={universities}
                  displayValue={(person: { id: string; name: string }) =>
                    person.name
                  }
                  required
                />
              </>
            )}

            <Input
              icon={AtSign}
              type="text"
              pattern="[A-Za-z]+"
              onInvalid={(e: InvalidEvent<HTMLInputElement>) => {
                e.target.setCustomValidity(
                  "Sadece harf karakterleri kullanabilirsiniz"
                );
              }}
              label="Kullanıcı adı"
              placeholder="Kullanıcı adınızı girin"
              required
              autoFocus
            />

            <Input
              icon={Lock}
              type="password"
              label="Şifre"
              placeholder="Şifrenizi girin"
              required
            />

            {isLogin || (
              <Input
                icon={Lock}
                type="password"
                label="Şifre (Tekrar)"
                placeholder="Şifrenizi girin"
                required
              />
            )}

            <Button fullWidth type="submit">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Hesabınız yok mu?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/?mode=register")}
                    className="text-blue-600 hover:underline"
                  >
                    Kayıt Olun
                  </button>
                </>
              ) : (
                <>
                  Zaten hesabınız var mı?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/?mode=login")}
                    className="text-blue-600 hover:underline"
                  >
                    Giriş Yapın
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
