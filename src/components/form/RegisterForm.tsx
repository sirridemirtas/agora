"use client";
import { useState, InvalidEvent } from "react";
import Link from "next/link";
import cn from "classnames";
import { AtSign, Lock, School } from "lucide-react";
import { universities } from "@/constants/universities";
import { Button, Card, Checkbox, Combobox, Input } from "@/components/ui";

export function RegisterForm() {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  return (
    <Card>
      <form className={cn("space-y-4")}>
        <Combobox
          icon={School}
          label="Üniversite"
          placeholder="Üniversitenizi seçin"
          options={universities}
          displayValue={(person: { id: string; name: string }) => person.name}
          required
        />

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
          placeholder="Kullanıcı adınızı seçin"
          required
        />

        <Input
          icon={Lock}
          type="password"
          label="Şifre"
          placeholder="Şifrenizi girin"
          required
        />

        <Input
          icon={Lock}
          type="password"
          label="Şifre (Tekrar)"
          placeholder="Şifrenizi tekrar girin"
          required
        />

        <Checkbox
          checked={privacyPolicyAccepted}
          onChange={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
          label={
            <>
              <Link href={"/privacy"} className="underline" target="_blank">
                Gizlilik politikası
              </Link>
              nı okudum ve kabul ediyorum.
            </>
          }
          required
        />

        <Button fullWidth type="submit">
          Kayıt Ol
        </Button>

        <div
          className={cn("text-center text-sm text-gray-600 dark:text-gray-400")}
        >
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className={cn("text-blue-600 hover:underline")}>
            Giriş yap
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;
