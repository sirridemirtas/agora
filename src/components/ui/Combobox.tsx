"use client";
import { useState } from "react";
import cn from "classnames";
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

interface ComboboxProps<T> {
  label?: string;
  placeholder?: string;
  options: T[];
  displayValue: (option: T) => string;
  error?: string;
  required?: boolean;
  icon?: React.ElementType;
  autoFocus?: boolean;
  className?: string;
}

function Combobox<T>({
  label,
  placeholder,
  options,
  displayValue,
  error,
  required,
  icon: Icon,
  autoFocus,
  className,
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
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}{" "}
          {/* required yıldızını ekliyoruz */}
        </label>
      )}
      <div className="relative">
        <HeadlessCombobox value={selected} onChange={setSelected}>
          <div className="relative">
            <ComboboxInput
              className={cn(
                "input",
                Icon && "input-with-icon",
                error ? "input-error" : "input-default",
                className
              )}
              placeholder={placeholder}
              displayValue={(option: T) => (option ? displayValue(option) : "")}
              onChange={(e) => setQuery(e.target.value)}
              required={required}
              autoFocus={autoFocus}
            />
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            )}
            <ComboboxButton className="absolute inset-y-0 right-3 flex items-center">
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            className={cn(
              "absolute mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white",
              "shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            )}
          >
            {filteredOptions.map((option, index) => (
              <ComboboxOption
                key={index}
                value={option}
                className={({ active, selected }) =>
                  cn(
                    "cursor-default select-none relative py-2 pl-10 pr-4",
                    active && "bg-neutral-200",
                    selected && "font-medium"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cn(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {displayValue(option)}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-3 flex items-center text-black">
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
