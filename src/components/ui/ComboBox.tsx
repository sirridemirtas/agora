import React, { useState } from "react";
import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import classNames from "classnames";

interface ComboboxProps<T> {
  label?: string;
  placeholder?: string;
  options: T[];
  displayValue: (option: T) => string;
  error?: string;
  required?: boolean;
  icon?: React.ElementType;
}

function Combobox<T>({
  label,
  placeholder,
  options,
  displayValue,
  error,
  required,
  icon: Icon,
}: ComboboxProps<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<T | null>(null);

  // Function to remove diacritical marks
  function removeDiacritics(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  // Updated filtering with diacritic-insensitive search
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          removeDiacritics(displayValue(option) || "").includes(
            removeDiacritics(query)
          )
        );
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          {required && <span className="text-red-500">*</span>}{" "}
          {/* required yıldızını ekliyoruz */}
        </label>
      )}
      <div className="relative">
        <HeadlessCombobox value={selected} onChange={setSelected}>
          <div className="relative">
            <ComboboxInput
              className={classNames(
                "w-full px-4 pr-10 py-2 bg-white dark:bg-gray-800 border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
                "transition-all duration-200",
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600",
                Icon ? "pl-10" : "" // icon varsa padding ekliyoruz
              )}
              placeholder={placeholder}
              displayValue={(option: T) => (option ? displayValue(option) : "")}
              onChange={(e) => setQuery(e.target.value)}
              required={required}
            />
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            )}
            <ComboboxButton className="absolute inset-y-0 right-3 flex items-center">
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            className={classNames(
              "absolute mt-1 w-full max-h-60 overflow-auto rounded-lg bg-white dark:bg-gray-800",
              "shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            )}
          >
            {filteredOptions.map((option, index) => (
              <ComboboxOption
                key={index}
                value={option}
                className={({ active, selected }) =>
                  classNames(
                    "cursor-default select-none relative py-2 pl-10 pr-4",
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-900 dark:text-gray-200",
                    selected && "font-medium"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {displayValue(option)}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-3 flex items-center text-blue-500">
                        <CheckIcon className="w-5 h-5" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </HeadlessCombobox>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {/* {selected && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: {displayValue(selected)}
        </p>
      )} */}
    </div>
  );
}

export default Combobox;
