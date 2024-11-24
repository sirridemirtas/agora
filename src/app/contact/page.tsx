import { AtSign, MessageSquareQuote, User } from "lucide-react";
import { PageTitle } from "@/components/common";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";

export default function Contact() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Destek" icon={MessageSquareQuote} />
      <Card>
        <form className="flex flex-col gap-4 max-w-sm mx-auto my-8 p-4">
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
      </Card>
    </div>
  );
}
