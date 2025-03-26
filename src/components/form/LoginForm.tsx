"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AtSign, SquareAsterisk } from "lucide-react";
import { Alert, Button, Input } from "@/components/ui";
import { AuthService, LoginCredentials } from "@/services/AuthService";
import { useApi, useAuth } from "@/hooks";
import {
  MAX_PASSWORD,
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
} from "@/constants";

const authService = new AuthService();

const LoginForm = () => {
  const { login: setAppStateToLoggedIn, isLoggedIn } = useAuth();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    type: "success" as "success" | "error",
    message: "",
  });
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
    universityId: "",
  });

  const pathname = usePathname();
  useEffect(() => {
    if (isLoggedIn && pathname === "/login") {
      router.push("/");
    }
  }, [isLoggedIn, pathname, router]);

  // ?username=john
  const query = new URLSearchParams(window.location.search);
  const usernameQP = query.get("username");
  if (usernameQP) {
    window.history.replaceState({}, document.title, window.location.pathname);
    setCredentials((prev) => ({ ...prev, username: usernameQP }));
  }

  const {
    loading,
    //error,
    execute: login,
  } = useApi(authService.login.bind(authService));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(credentials);
    if (result.data) {
      const { username, universityId } = result.data;
      setAppStateToLoggedIn({ username, universityId });
      if (pathname === "/login") router.push("/");
    } else if (result.error) {
      setAlertProps({
        type: "error",
        message: result.error.message,
      });
      setShowAlert(true);
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
        minLength={MIN_USERNAME}
        maxLength={MAX_USERNAME}
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
        minLength={MIN_PASSWORD}
        maxLength={MAX_PASSWORD}
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

      {showAlert && (
        <Alert
          type={alertProps.type}
          message={alertProps.message}
          show={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
    </form>
  );
};

export default LoginForm;
