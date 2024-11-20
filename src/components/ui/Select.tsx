import React from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={classNames(
                "w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
                "flex items-center justify-between",
                "transition-all duration-200",
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            >
              <span className={selectedOption ? "" : "text-gray-500"}>
                {selectedOption
                  ? selectedOption.label
                  : placeholder || "Select an option"}
              </span>
              <ChevronsUpDownIcon className="w-5 h-5 text-gray-500" />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }) =>
                    classNames(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      active
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-white dark:bg-gray-800",
                      selected
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-gray-900 dark:text-gray-100"
                    )
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 left-0 flex items-center pl-3",
                            active
                              ? "text-blue-900 dark:text-blue-100"
                              : "text-blue-600"
                          )}
                        >
                          <CheckIcon className="w-5 h-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
