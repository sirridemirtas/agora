"use client";
import { forwardRef } from "react";
import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import cn from "classnames";
import { Check } from "lucide-react";

interface CheckboxProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      onChange,
      indeterminate = false,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <HeadlessCheckbox
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        className={cn("group flex items-center", className)}
        {...props}
      >
        {({ checked }) => (
          <>
            <div
              className={cn(
                "w-5 h-5 flex items-center justify-center rounded border",
                "transition-colors duration-200",
                checked
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-300 dark:border-gray-600",
                disabled && "opacity-50 cursor-not-allowed",
                "group-hover:border-blue-600"
              )}
            >
              {checked && (
                <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              )}
              {!checked && indeterminate && (
                <div className="w-2 h-2 bg-blue-600 rounded-sm" />
              )}
            </div>
            {label && (
              <span
                className={cn(
                  "ml-2 text-sm text-gray-700 dark:text-gray-200",
                  disabled && "opacity-50"
                )}
              >
                {label}
              </span>
            )}
          </>
        )}
      </HeadlessCheckbox>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
