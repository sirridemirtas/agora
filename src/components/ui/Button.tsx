import React from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { Button as HeadlessButton } from "@headlessui/react";

interface ButtonProps {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon: Icon,
      iconPosition = "left",
      variant = "primary",
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClass = clsx(
      "flex items-center justify-center",
      "rounded-xl px-4 py-2",
      "transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "active:bg-opacity-80",
      "dark:border dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
      {
        "bg-black text-white focus:ring-neutral-600": variant === "primary",
        "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600":
          variant === "secondary",
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600":
          variant === "danger",
        "w-full": fullWidth,
      },
      className
    );

    return (
      <HeadlessButton ref={ref} className={buttonClass} {...props}>
        {Icon && iconPosition === "left" && (
          <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className="ml-2 h-5 w-5" aria-hidden="true" />
        )}
      </HeadlessButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
