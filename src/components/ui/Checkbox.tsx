import React, { forwardRef, useState } from "react";
import { Check } from "lucide-react";
import cn from "classnames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      className,
      indeterminate = false,
      checked: controlledChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(false);

    // Determine the actual checked state
    const isChecked =
      controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // If not a controlled component, update internal state
      if (controlledChecked === undefined) {
        setInternalChecked(e.target.checked);
      }

      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="flex items-center">
        <div
          className={cn(
            "relative inline-flex h-5 w-5 items-center justify-center rounded border",
            {
              "bg-blue-600 border-blue-600": isChecked || indeterminate,
              "bg-white border-gray-300": !(isChecked || indeterminate),
              "opacity-50 cursor-not-allowed": props.disabled,
              "cursor-pointer hover:border-blue-600": !props.disabled,
            },
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          )}
        >
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "absolute inset-0 opacity-0 cursor-pointer",
              className
            )}
            checked={isChecked}
            onChange={handleChange}
            {...props}
          />
          {(isChecked || indeterminate) && (
            <Check
              className={cn("h-4 w-4 text-white", {
                "rotate-90 scale-75": indeterminate,
              })}
              strokeWidth={3}
            />
          )}
        </div>
        {label && (
          <label
            className={cn("ml-2 select-none text-sm", {
              "text-gray-400": props.disabled,
              "text-gray-700 hover:text-gray-900": !props.disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
