"use client";
import cn from "classnames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className, props }) => {
  return (
    <div
      className={cn("bg-white shadow-sm rounded-lg p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
