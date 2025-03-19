"use client";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

interface Option<T> {
  value: T;
  icon?: React.ReactNode;
  label?: string;
  ariaLabel?: string;
  href?: string;
}

interface RadioGroupProps<T> {
  value: T;
  onChange?: (value: T) => void;
  options: Option<T>[];
  variant?: "icon" | "text";
  className?: string;
}

export default function RadioGroup<T>({
  value,
  onChange,
  options,
  variant = "text",
  className,
}: RadioGroupProps<T>) {
  const containerClass = clsx(
    "inline-flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-neutral-800",
    className
  );

  if (onChange) {
    // Durum yönetimi: RadioGroup ile düğmeler
    return (
      <HeadlessRadioGroup
        value={value}
        onChange={onChange}
        className={containerClass}
      >
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={String(option.value)}
            value={option.value}
          >
            {({ checked }) => (
              <button
                className={clsx(
                  "rounded-md p-2 transition-all",
                  checked
                    ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-white"
                    : variant === "icon"
                      ? "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      : "bg-none text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-800"
                )}
                aria-label={option.ariaLabel || option.label}
              >
                <span className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  {option.label && (
                    <span className="pr-1 text-sm">{option.label}</span>
                  )}
                </span>
              </button>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </HeadlessRadioGroup>
    );
  } else {
    // Gezinme: tablist ve Link bileşenleri
    return (
      <div role="tablist" className={containerClass}>
        {options.map((option) => (
          <Link
            key={String(option.value)}
            href={option.href || "#"}
            role="tab"
            aria-selected={option.value === value}
            className={clsx(
              "rounded-md p-2 transition-all",
              option.value === value
                ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-white"
                : variant === "icon"
                  ? "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  : "bg-none text-black hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-800"
            )}
          >
            <span className="flex items-center gap-2">
              {option.icon && <span>{option.icon}</span>}
              {option.label && (
                <span className="pr-1 text-sm">{option.label}</span>
              )}
            </span>
          </Link>
        ))}
      </div>
    );
  }
}
