"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SquareAsterisk as PasswordIcon } from "lucide-react";
import { useAuth, usePageTitle } from "@/hooks";
import { Alert, AlertType, Button, Input } from "@/components/ui";
import { useUserService } from "@/hooks/useUserService";

export default function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const { resetPassword, passwordResetError, passwordResetLoading } =
    useUserService();
  const router = useRouter();
  const { setTitle } = usePageTitle();
  const { logout } = useAuth();

  useEffect(() => {
    setTitle("Şifreyi Değiştir");
  }, [setTitle]);

  useEffect(() => {
    if (passwordResetError) {
      setAlert({
        type: "error",
        message:
          typeof passwordResetError === "string"
            ? passwordResetError
            : passwordResetError.message || "Şifre sıfırlama işlemi başarısız.",
      });
    }
  }, [passwordResetError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Yeni şifreler eşleşmiyor.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await resetPassword(currentPassword, newPassword);

      if (response.data) {
        setAlert({
          type: "success",
          message: response.data.message,
        });

        setTimeout(() => {
          logout();
          router.push("/login");
        }, 2000);
      } else if (response.error) {
        // Handle error which might be a string directly
        setAlert({
          type: "error",
          message:
            typeof response.error === "string"
              ? response.error
              : response.error.message || "Şifre sıfırlama işlemi başarısız.",
        });
      }
    } catch (error: unknown) {
      // Handle any unexpected errors
      setAlert({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Beklenmeyen bir hata oluştu.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <Input
        icon={PasswordIcon}
        placeholder="Mevcut şifrenizi girin"
        type="password"
        required
        autoFocus
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        icon={PasswordIcon}
        placeholder="Yeni şifrenizi girin"
        type="password"
        required
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        icon={PasswordIcon}
        placeholder="Yeni şifrenizi tekrar girin"
        type="password"
        required
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" disabled={submitting || passwordResetLoading}>
        Kaydet
      </Button>

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
