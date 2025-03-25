"use client";
import { AtSign, MessageSquareQuote, User } from "lucide-react";
import { Alert, Button, Input, Select, Textarea } from "@/components/ui";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "genel",
    message: "",
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Form ID extracted from the URL
  const FORM_ID = "1FAIpQLSdKSnGiN6BMg9dm53aB0FYhNR2hT-ZsLE1IQUxQehlON5wbYg";

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
    setIsSubmitting(true);

    // Create a form data object for submission
    const googleFormData = new FormData();

    // Map to Google Form entry IDs
    googleFormData.append("entry.1278516670", formData.name);
    googleFormData.append("entry.594480513", formData.email);
    googleFormData.append("entry.508744151", formData.subject);
    googleFormData.append("entry.1252619669", formData.message);

    try {
      // Submit to Google Form
      const response = await fetch(
        `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
        {
          method: "POST",
          body: googleFormData,
          mode: "no-cors",
        }
      );

      // Note: When using mode: "no-cors", we can't actually read the status
      // due to CORS restrictions. We'll handle this special case.

      if (response.type === "opaque") {
        // With mode: "no-cors", the response type is 'opaque'
        // We can't access status, but request was sent
        setFormData({ name: "", email: "", subject: "genel", message: "" });
        setAlert({
          type: "success",
          message:
            "Formunuz gönderildi! (Not: CORS kısıtlaması nedeniyle kesin durum alınamadı)",
        });
      } else if (response.ok) {
        // This branch will execute if not using no-cors mode and response is successful
        setFormData({ name: "", email: "", subject: "genel", message: "" });
        setAlert({
          type: "success",
          message: "Formunuz başarıyla gönderildi!",
        });
      } else {
        // Status code is not 2xx
        setAlert({
          type: "error",
          message: `Form gönderilirken bir hata oluştu. Durum kodu: ${response.status}`,
        });
      }
    } catch (error) {
      console.error("Form gönderiminde hata oluştu:", error);
      setAlert({
        type: "error",
        message: "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
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

      <Button type="submit" disabled={isSubmitting}>
        Gönder
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
