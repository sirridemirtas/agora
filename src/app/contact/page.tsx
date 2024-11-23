"use client";
import { AtSign, MessageSquareQuote, User } from "lucide-react";
import { PageTitle } from "@/components/common";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";

export default function Contact() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Destek" icon={MessageSquareQuote} />
      <Card>
        <form className="flex flex-col gap-4">
          <Input
            label="Ad Soyad"
            icon={User}
            placeholder="Adınızı ve soyadınızı girin"
            autoFocus
            required
          />
          <Input
            label="E-posta"
            icon={AtSign}
            placeholder="E-posta adresinizi girin"
            type="email"
            required
          />
          <Select
            label="Konu"
            icon={MessageSquareQuote}
            options={[
              { value: "", label: "-Konuyu seçin-" },
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
            label="Mesaj"
            placeholder="Mesajınızı girin"
            maxLength={500}
            required
          />

          <Button type="submit">Gönder</Button>
        </form>
      </Card>
    </div>
  );
}
