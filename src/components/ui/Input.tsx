import { forwardRef } from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon: Icon, label, helperText, error, success, className, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            className={clsx(
              "input",
              Icon && "input-with-icon",
              error ? "input-error" : "input-default",
              success && "input-success",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {helperText && (
          <p className="text-sm text-gray-500" role="alert">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
