import cn from "classnames";
import { Origami } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        "transition-colors duration-300",
        "hidden lg:flex cursor-pointer",
        //"text-blue-700 bg-blue-50",
        className
      )}
    >
      <Origami size={28} />
    </div>
  );
};

export default Logo;
