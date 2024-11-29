"use client";

import { forwardRef } from "react";
import clsx from "clsx";
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
  name?: string;
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
      name,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx("relative", className)}>
        <HeadlessCheckbox
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className="group flex items-center"
          {...props}
        >
          {({ checked }) => (
            <>
              <div
                className={clsx(
                  "flex h-5 w-5 items-center justify-center rounded",
                  "border border-gray-300",
                  "transition-colors duration-200",
                  checked ? "border-transparent bg-black" : "bg-neutral-50",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {checked && (
                  <Check
                    className="h-3.5 w-3.5 text-white"
                    aria-hidden="true"
                  />
                )}
                {!checked && indeterminate && (
                  <div className="h-2 w-2 rounded-sm bg-black" />
                )}
              </div>
              {label && (
                <span
                  className={clsx(
                    "ml-2 text-sm text-gray-700",
                    disabled && "opacity-50"
                  )}
                  onClick={(e) => {
                    // Prevent checkbox toggle only if clicking on a link
                    if ((e.target as HTMLElement).closest("a")) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {label}
                </span>
              )}
            </>
          )}
        </HeadlessCheckbox>
        {/* Hidden input for form validation */}
        <input
          type="checkbox"
          className="sr-only"
          tabIndex={-1}
          required={props.required}
          checked={checked}
          onChange={() => {}}
          name={name}
          aria-hidden="true"
        />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
