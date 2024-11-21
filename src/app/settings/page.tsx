import { Settings } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Ayarlar" icon={Settings} />
      <Card>Ayarlar</Card>
    </div>
  );
}
