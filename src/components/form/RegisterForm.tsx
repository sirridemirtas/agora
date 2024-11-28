"use client";
import { useState, InvalidEvent } from "react";
import Link from "next/link";
import cn from "classnames";
import { AtSign, Lock, School } from "lucide-react";
import { universities } from "@/constants/universities";
import { Button, Checkbox, Combobox, Input } from "@/components/ui";

export function RegisterForm() {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  return (
    <form className={"form"}>
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
        required={true}
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
  );
}

export default RegisterForm;
