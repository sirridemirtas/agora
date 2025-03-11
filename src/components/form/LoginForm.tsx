"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, SquareAsterisk } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { AuthService, LoginCredentials } from "@/services/AuthService";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";

const authService = new AuthService();

const LoginForm = () => {
  const { login: setAppStateToLoggedIn } = useAuth();
  const router = useRouter();
  const { addSnackbar } = useSnackbar();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
    universityId: "",
  });

  // ?username=john
  const query = new URLSearchParams(window.location.search);
  const usernameQP = query.get("username");
  if (usernameQP) {
    // remove query param from URL
    window.history.replaceState({}, document.title, window.location.pathname);

    setCredentials((prev) => ({
      ...prev,
      username: usernameQP,
    }));
  }

  const {
    loading,
    error,
    execute: login,
  } = useApi(authService.login.bind(authService));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (process.env.NEXT_PUBLIC_IS_BACKEND_ACTIVE === "false") {
      setAppStateToLoggedIn();
      router.push("/");
      return;
    }

    const result = await login(credentials);
    if (result.data) {
      const { username, universityId } = result.data;
      setAppStateToLoggedIn({ username, universityId });
      router.push("/");
      /* addSnackbar({
        message: "Giriş başarılı!",
      }); */
    } else if (error) {
      addSnackbar({
        message: error.message,
        type: "error",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        icon={AtSign}
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Kullanıcı adınızı girin"
        pattern="[A-Za-z]+"
        required
        autoFocus
      />
      <Input
        icon={SquareAsterisk}
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Şifrenizi girin"
        type="password"
        required
      />
      <Button type="submit" disabled={loading}>
        Giriş Yap
      </Button>

      <div className="text-center text-sm text-gray-600">
        Hesabın yok mu?{" "}
        <Link href="/register" className="underline">
          Kaydol
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
