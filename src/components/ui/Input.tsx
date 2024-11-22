import classNames from "classnames";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        )}
        <input
          className={classNames(
            "w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
            "transition-all duration-200",
            Icon ? "pl-10" : "",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
