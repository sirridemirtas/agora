import { School } from "lucide-react";

interface UniversityHeaderProps {
  university: string;
}

export default function UniversityHeader({
  university,
}: UniversityHeaderProps) {
  return (
    <div className="bg-white sm:rounded-xl p-4 shadow-sm sm:mb-4 flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-lg">
        <School className="text-blue-700" size={24} />
      </div>
      <h1 className="text-xl font-semibold">{university}</h1>
    </div>
  );
}
