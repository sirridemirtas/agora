import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { AtSign, SquareAsterisk, LogIn } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Login() {
  return (
    <Card>
      <form className="flex flex-col gap-4">
        <Input
          label="Kullancı Adı"
          icon={AtSign}
          placeholder="Kullanıcı Adı"
          required
        />
        <Input
          icon={SquareAsterisk}
          placeholder="Şifre"
          label="Şifre"
          type="password"
          required
        />
        <Button type="submit" icon={LogIn}>
          Giriş Yap
        </Button>
      </form>
    </Card>
  );
}
