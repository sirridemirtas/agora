import { Settings } from "lucide-react";
import { Card } from "@/components/ui";
import { PageTitle } from "@/components/common";

export default function SettingsPage() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Ayarlar" icon={Settings} />
      <Card>Ayarlar</Card>
    </div>
  );
}
