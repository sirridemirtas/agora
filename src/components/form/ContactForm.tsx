"use client";
import { useState, FormEvent } from "react";
import { AtSign, MessageSquareQuote, User } from "lucide-react";
import { Alert, Button, Input, Select, Textarea } from "@/components/ui";
// Import directly from the file, not from the barrel import
import { useContact } from "@/hooks/useContact";
import { ContactSubject } from "@/services/ContactService";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Genel" as ContactSubject,
    message: "",
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Use the contact hook
  const { submitContactForm, contactLoading } = useContact();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject as ContactSubject,
        message: formData.message,
      });

      if (response.error) {
        // Handle API error
        setAlert({
          type: "error",
          message: response.error.message,
        });
      } else {
        // Success response
        setFormData({
          name: "",
          email: "",
          subject: "Genel" as ContactSubject,
          message: "",
        });
        setAlert({
          type: "success",
          message:
            response.data?.message ||
            "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
        });
      }
    } catch (error) {
      console.error("Form gönderiminde hata oluştu:", error);
      setAlert({
        type: "error",
        message: "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        icon={User}
        placeholder="Adınızı ve soyadınızı girin"
        autoFocus
        required
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        icon={AtSign}
        placeholder="E-posta adresinizi girin"
        type="email"
        required
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Select
        icon={MessageSquareQuote}
        options={[
          { value: "Genel", label: "Genel" },
          { value: "Destek", label: "Destek" },
          { value: "Teknik", label: "Teknik" },
          { value: "Öneri", label: "Öneri" },
          { value: "Şikayet", label: "Şikayet" },
        ]}
        required
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <Textarea
        className="h-32"
        placeholder="Mesajınızı girin"
        maxLength={500}
        required
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <Button type="submit" disabled={contactLoading}>
        {contactLoading ? "Gönderiliyor..." : "Gönder"}
      </Button>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          show={!!alert}
          onClose={clearAlert}
          autoClose={true}
          autoCloseTime={10000}
        />
      )}
    </form>
  );
}
