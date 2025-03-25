"use client";
import { useEffect, useState } from "react";
import { SquareAsterisk as PasswordIcon } from "lucide-react";
import { usePageTitle } from "@/hooks";
import { Alert, AlertType, Button, Input } from "@/components/ui";

export default function ResetPassword() {
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle("Şifreyi Değiştir");
  }, [setTitle]);

  return (
    <form className="form" method="post">
      <Input
        icon={PasswordIcon}
        placeholder="Mevcut şifrenizi girin"
        type="password"
        required
        autoFocus
        name="currentPassword"
      />
      <Input
        icon={PasswordIcon}
        placeholder="Yeni şifrenizi girin"
        type="password"
        required
        name="newPassword"
      />
      <Input
        icon={PasswordIcon}
        placeholder="Yeni şifrenizi tekrar girin"
        type="password"
        required
      />

      <Button type="submit">Gönder</Button>

      {alert && (
        <Alert
          type={alert.type as AlertType}
          message={alert.message}
          onClose={() => setAlert(null)}
          autoClose
        />
      )}
    </form>
  );
}
