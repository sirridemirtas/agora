"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthService, RegisterCredentials } from "@/services/AuthService";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { AtSign, Lock, School } from "lucide-react";
import { universities } from "@/constants/universities";
import { Button, Checkbox, Combobox, Input } from "@/components/ui";

export function RegisterForm() {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const { addSnackbar } = useSnackbar();
  const router = useRouter();

  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const authService = new AuthService();
  const {
    loading,
    error,
    execute: register,
  } = useApi(authService.register.bind(authService));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!privacyPolicyAccepted) {
      return;
    }

    if (
      e.currentTarget.password.value !== e.currentTarget.passwordRepeat.value
    ) {
      addSnackbar({
        message: "Şifreler uyuşmuyor!",
        type: "error",
      });
      return;
    }

    const credentials: RegisterCredentials = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      universityId: universities.filter(
        (university) => university.name === e.currentTarget.universityId.value
      )[0].id,
    };

    const result = await register(credentials);
    if (result.data) {
      addSnackbar({
        message: "Kayıt başarılı!",
      });
      router.push("/login?username=" + credentials.username);
    } else if (error) {
      addSnackbar({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
      <Combobox
        name="universityId"
        icon={School}
        placeholder="Üniversitenizi seçin"
        options={universities}
        displayValue={(u: { id: string; name: string }) => u.name}
        autoFocus
        required
      />

      <Input
        name="username"
        icon={AtSign}
        type="text"
        pattern="[A-Za-z]+"
        placeholder="Kullanıcı adınızı seçin"
        title="En az 3 haneli olabilir, sadece harf ve rakam içerebilir"
        required
      />

      <Input
        name="password"
        icon={Lock}
        type="password"
        placeholder="Şifrenizi girin"
        required
      />

      <Input
        name="passwordRepeat"
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

      <Button fullWidth type="submit" disabled={loading}>
        Kayıt Ol
      </Button>

      <div className={clsx("text-center text-sm text-gray-600")}>
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className={"underline"}>
          Giriş yap
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
