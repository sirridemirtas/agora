"use client";
import { forwardRef } from "react";
import cn from "classnames";
import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import { Check } from "lucide-react";

interface CheckboxProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
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
        required={props.required}
        {...props}
      >
        {({ checked }) => (
          <>
            <div
              className={cn(
                "w-5 h-5 flex items-center justify-center rounded",
                "border border-gray-300",
                "transition-colors duration-200",
                checked ? "bg-black border-transparent" : "bg-neutral-50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {checked && (
                <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              )}
              {!checked && indeterminate && (
                <div className="w-2 h-2 bg-black rounded-sm" />
              )}
            </div>
            {label && (
              <span
                className={cn(
                  "ml-2 text-sm text-gray-700",
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
