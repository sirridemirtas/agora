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
      <form className={"flex flex-col gap-4 max-w-sm mx-auto my-8 p-4"}>
        <Combobox
          icon={School}
          placeholder="Üniversitenizi seçin"
          options={universities}
          displayValue={(person: { id: string; name: string }) => person.name}
          autoFocus
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
          placeholder="Kullanıcı adınızı seçin"
          required
        />

        <Input
          icon={Lock}
          type="password"
          placeholder="Şifrenizi girin"
          required
        />

        <Input
          icon={Lock}
          type="password"
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

        <div className={cn("text-center text-sm text-gray-600")}>
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className={"underline"}>
            Giriş yap
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;
