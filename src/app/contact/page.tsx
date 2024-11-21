import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import PageTitle from "@/components/common/PageTitle";
import { User, AtSign, MessageSquareQuote } from "lucide-react";

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
