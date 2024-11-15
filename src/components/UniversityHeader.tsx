import { School } from 'lucide-react';

interface UniversityHeaderProps {
  university: string;
}

export default function UniversityHeader({ university }: UniversityHeaderProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-lg">
        <School className="text-blue-500" size={24} />
      </div>
      <h1 className="text-xl font-semibold">{university}</h1>
    </div>
  );
}