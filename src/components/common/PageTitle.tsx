import { LucideIcon } from "lucide-react";

interface PageTitleProps {
  title: string;
  icon?: LucideIcon;
}

const PageTitle = ({ title, icon: Icon }: PageTitleProps) => {
  return (
    <div className="bg-white sm:rounded-xl p-4 shadow-sm sm:mb-4 flex items-center gap-3">
      {Icon ? (
        <div className="bg-neutral-100 p-2 rounded-lg">
          <Icon className="text-black" size={24} />
        </div>
      ) : (
        ""
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default PageTitle;
