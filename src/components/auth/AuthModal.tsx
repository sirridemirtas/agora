"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, School } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <>
              <Input
                icon={User}
                label="Kullanıcı Adı"
                placeholder="Kullanıcı adınızı girin"
                required
              />
              <Input
                icon={School}
                label="Üniversite"
                placeholder="Üniversitenizi seçin"
                required
              />
            </>
          )}

          <Input
            icon={Mail}
            type="email"
            label="E-posta"
            placeholder="E-posta adresinizi girin"
            required
          />

          <Input
            icon={Lock}
            type="password"
            label="Şifre"
            placeholder="Şifrenizi girin"
            required
          />

          <Button fullWidth type="submit">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </Button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? (
              <>
                Hesabınız yok mu?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
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
                  onClick={() => setIsLogin(true)}
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
  );
};

export default AuthModal;
