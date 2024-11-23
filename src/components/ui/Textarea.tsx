import cn from "classnames";
import { LucideIcon } from "lucide-react";
import { Field, Label, Textarea as HeadlessTextarea } from "@headlessui/react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  icon: Icon,
  label,
  error,
  className,
  disabled,
  ...props
}) => {
  return (
    <Field disabled={disabled} className="flex flex-col space-y-1">
      {label && (
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-200 data-[disabled]:opacity-50">
          {label}
        </Label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500",
              disabled && "opacity-50"
            )}
            aria-hidden="true"
          />
        )}
        <HeadlessTextarea
          className={cn(
            "w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
            "transition-all duration-200",
            "resize-none",
            "data-[disabled]:bg-gray-100 data-[disabled]:opacity-50",
            Icon ? "pl-10" : "",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </Field>
  );
};

export default Textarea;
