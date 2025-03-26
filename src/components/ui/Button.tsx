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
    const isIconOnly = Icon && !children;

    const buttonClass = clsx(
      "flex items-center justify-center",
      {
        "rounded-xl px-4 py-2": !isIconOnly, // Normal button styles
        "rounded-full p-2": isIconOnly, // Circular button styles when icon-only
      },
      "transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "active:bg-opacity-80",
      "dark:border dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white",
      {
        "bg-black text-white focus:ring-neutral-600": variant === "primary",
        "bg-neutral-100 text-black hover:bg-neutral-200 focus:ring-neutral-500":
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
          <Icon
            className={clsx("h-5 w-5", { "mr-2": !isIconOnly })}
            aria-hidden="true"
          />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon
            className={clsx("h-5 w-5", { "ml-2": !isIconOnly })}
            aria-hidden="true"
          />
        )}
      </HeadlessButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
