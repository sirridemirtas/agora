"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, LogIn, SquareAsterisk } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Input } from "@/components/ui";
import { PageTitle } from "@/components/common";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    router.push("/");
  };

  return (
    <div className="lg:flex-1">
      <PageTitle title="Giriş Yap" icon={LogIn} />
      <Card>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Kullancı Adı"
            icon={AtSign}
            placeholder="Kullanıcı adınızı girin"
            pattern="[A-Za-z]+"
            required
            autoFocus
          />
          <Input
            icon={SquareAsterisk}
            placeholder="Şifrenizi girin"
            label="Şifre"
            type="password"
            required
          />
          <Button type="submit">Giriş Yap</Button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Hesabın yok mu?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Kaydol
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
