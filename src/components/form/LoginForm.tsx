"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, SquareAsterisk } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@/components/ui";

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    router.push("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        icon={AtSign}
        placeholder="Kullanıcı adınızı girin"
        pattern="[A-Za-z]+"
        required
        autoFocus
      />
      <Input
        icon={SquareAsterisk}
        placeholder="Şifrenizi girin"
        type="password"
        required
      />
      <Button type="submit">Giriş Yap</Button>

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
