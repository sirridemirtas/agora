"use client";

import React, { useState, InvalidEvent } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Lock, School, AtSign, SquarePen } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Combobox from "@/components/ui/Combobox";
import Checkbox from "@/components/ui/Checkbox";
import { universities } from "@/constants/universities";

export default function Register() {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  return (
    <div className={classNames("lg:flex-1")}>
      <PageTitle title="Kayıt Ol" icon={SquarePen} />
      <Card>
        <form className={classNames("space-y-4")}>
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
            className={classNames(
              "text-center text-sm text-gray-600 dark:text-gray-400"
            )}
          >
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              className={classNames("text-blue-600 hover:underline")}
            >
              Giriş yap
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
