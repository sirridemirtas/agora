import cn from "classnames";
import { Field, Label, Select } from "@headlessui/react";
import { LucideIcon } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const SelectComponent: React.FC<SelectProps> = ({
  icon: Icon,
  label,
  error,
  options,
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
          />
        )}
        <Select
          className={cn(
            "w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Icon ? "pl-10" : "",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </Field>
  );
};

export default SelectComponent;
