import clsx from "clsx";
import { Field, Label, Select } from "@headlessui/react";
import { LucideIcon, ChevronDownIcon } from "lucide-react";

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
          />
        )}
        <Select
          className={clsx(
            "input",
            Icon && "input-with-icon",
            error ? "input-error" : "input-default",
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
        <ChevronDownIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
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
