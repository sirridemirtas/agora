"use client";
import { useState } from "react";
import clsx from "clsx";
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
              className={clsx(
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
              <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            )}
            <ComboboxButton className="absolute inset-y-0 right-3 flex items-center">
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            className={clsx(
              "absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white",
              "z-10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
              "dark:bg-neutral-800"
            )}
          >
            {filteredOptions.map((option, index) => (
              <ComboboxOption
                key={index}
                value={option}
                className={({ active, selected }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active && "bg-neutral-200 dark:bg-neutral-700",
                    selected && "font-medium"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {displayValue(option)}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-3 flex items-center text-black dark:text-white">
                        <CheckIcon className="h-5 w-5" />
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
