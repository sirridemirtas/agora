import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className, props }) => {
  return (
    <div
      className={clsx("bg-white p-4 sm:rounded-xl sm:shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
