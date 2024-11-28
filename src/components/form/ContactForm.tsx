import { AtSign, MessageSquareQuote, User } from "lucide-react";
import { Button, Input, Select, Textarea } from "@/components/ui";

export default function ContactForm() {
  return (
    <form className="form">
      <Input
        icon={User}
        placeholder="Adınızı ve soyadınızı girin"
        autoFocus
        required
      />
      <Input
        icon={AtSign}
        placeholder="E-posta adresinizi girin"
        type="email"
        required
      />
      <Select
        icon={MessageSquareQuote}
        options={[
          { value: "genel", label: "Genel" },
          { value: "destek", label: "Destek" },
          { value: "teknik", label: "Teknik" },
          { value: "oneri", label: "Öneri" },
          { value: "sikayet", label: "Şikayet" },
        ]}
        required
      />

      <Textarea
        className="h-32"
        placeholder="Mesajınızı girin"
        maxLength={500}
        required
      />

      <Button type="submit">Gönder</Button>
    </form>
  );
}
