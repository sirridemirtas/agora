import clsx from "clsx";
import { Origami } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex h-12 w-12 items-center justify-center rounded-full",
        "transition-colors duration-300",
        "hidden cursor-pointer lg:flex",
        "dark:text-white",
        className
      )}
    >
      <Origami size={28} />
    </div>
  );
};

export default Logo;
