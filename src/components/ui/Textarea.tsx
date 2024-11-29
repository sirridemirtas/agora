import clsx from "clsx";
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
        <Label className="text-sm font-medium text-gray-700 data-[disabled]:opacity-50">
          {label}
        </Label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className={clsx(
              "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500",
              disabled && "opacity-50"
            )}
            aria-hidden="true"
          />
        )}
        <HeadlessTextarea
          className={clsx(
            "input",
            "resize-none",
            Icon && "input-with-icon",
            error ? "input-error" : "input-default",
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
