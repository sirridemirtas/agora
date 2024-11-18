import React from "react";
import { LucideIcon } from "lucide-react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  iconPosition = "left",
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}) => {
  const buttonClass = classNames(
    "flex items-center justify-center",
    "px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
    {
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600":
        variant === "primary",
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600":
        variant === "secondary",
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600":
        variant === "danger",
      "w-full": fullWidth,
    },
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5 ml-2" />}
    </button>
  );
};

export default Button;
