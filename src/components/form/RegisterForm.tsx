"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthService, RegisterCredentials } from "@/services/AuthService";
import { useApi, useAuth } from "@/hooks";
import { AtSign, Check, Lock, School } from "lucide-react";
import { universities } from "@/constants/universities";
import { Alert, Button, Checkbox, Combobox, Input } from "@/components/ui";
import { MIN_PASSWORD, MAX_PASSWORD } from "@/constants";
//import { Turnstile } from "@marsidev/react-turnstile";

export function RegisterForm() {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  );
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  //const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const authService = useMemo(() => new AuthService(), []);
  const {
    loading,
    error,
    execute: register,
  } = useApi(authService.register.bind(authService));

  // Debounced username check
  const checkUsernameAvailability = useCallback(async () => {
    if (username) {
      const result = await authService.checkUsername(username);
      if (result.data) {
        setUsernameAvailable(result.data.available);
        setUsernameError(
          result.data.available ? undefined : result.data.message
        );
      } else if (result.error) {
        setUsernameError(result.error.message);
      }
    }
  }, [username, authService]);

  useEffect(() => {
    // Clear any existing timeouts
    const timeoutId = setTimeout(() => {
      checkUsernameAvailability();
    }, 2000); // 2 seconds after last keystroke

    // Cleanup timeout on component unmount or when username changes again
    return () => {
      clearTimeout(timeoutId);
    };
  }, [username, checkUsernameAvailability]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!privacyPolicyAccepted) {
      return;
    }

    /*     if (!turnstileToken) {
      setAlert({
        message: "Lütfen robot olmadığınızı doğrulayın.",
        type: "error",
      });
      return;
    } */

    if (
      e.currentTarget.password.value !== e.currentTarget.passwordRepeat.value
    ) {
      setAlert({
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
      //turnstileToken: turnstileToken, // Add token to credentials
    };

    const result = await register(credentials);
    if (result.data) {
      setAlert({
        message: "Kayıt başarılı!",
        type: "success",
      });
      router.push("/login?username=" + credentials.username);
    } else if (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // Reset the availability state while typing
    if (usernameAvailable) setUsernameAvailable(false);
    if (usernameError) setUsernameError(undefined);
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
        icon={usernameAvailable ? Check : AtSign}
        type="text"
        pattern="[A-Za-z0-9]+"
        placeholder="Kullanıcı adınızı seçin"
        title="En az 3 haneli olabilir, sadece harf ve rakam içerebilir"
        required
        error={usernameError}
        onChange={handleUsernameChange}
      />

      <Input
        name="password"
        icon={Lock}
        type="password"
        placeholder="Şifrenizi girin"
        minLength={MIN_PASSWORD}
        maxLength={MAX_PASSWORD}
        required
      />

      <Input
        name="passwordRepeat"
        icon={Lock}
        type="password"
        placeholder="Şifrenizi tekrar girin"
        minLength={MIN_PASSWORD}
        maxLength={MAX_PASSWORD}
        required
      />

      {/*       <div
        className={clsx(
          "turnstile-wrapper overflow-hidden rounded-xl",
          "border border-neutral-200 dark:border-neutral-800",
          "bg-[#fafafa] dark:bg-[#232323]"
        )}
      >
        <Turnstile
          style={{ clipPath: "inset(2px)" }}
          // Replace with your actual Cloudflare site key
          siteKey="0x4AAAAAABCdVxGsF90FpfkB"
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => {
            setTurnstileToken(null);
            setAlert({
              message: "Doğrulama hatası, lütfen tekrar deneyin.",
              type: "error",
            });
          }}
          onExpire={() => setTurnstileToken(null)}
          options={{
            theme: "auto",
            language: "tr",
            size: "flexible",
          }}
        />
      </div> */}

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

      <Button
        fullWidth
        type="submit"
        disabled={loading /* || !turnstileToken */}
      >
        Kayıt Ol
      </Button>

      <div className={clsx("text-center text-sm text-gray-600")}>
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className={"underline"}>
          Giriş yap
        </Link>
      </div>
      {alert && (
        <Alert
          type={alert.type as "success" | "error" | "info" | "warning" | "dark"}
          message={alert.message}
          onClose={() => setAlert(null)}
          autoClose
        />
      )}
    </form>
  );
}

export default RegisterForm;
