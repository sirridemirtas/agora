import { LogIn } from "lucide-react";
import { Card } from "@/components/ui";
import { PageTitle } from "@/components/common";
import { LoginForm } from "@/components/form";

export default function Login() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Giriş Yap" icon={LogIn} />
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
