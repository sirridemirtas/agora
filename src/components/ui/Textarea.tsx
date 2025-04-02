"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { Field, Label, Textarea as HeadlessTextarea } from "@headlessui/react";
import { useRef, useEffect } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  autosize?: boolean;
  nostyle?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  icon: Icon,
  label,
  error,
  className,
  disabled,
  autosize = false,
  value,
  defaultValue,
  onChange,
  onInput,
  nostyle = false,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (autosize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 1 + "px";
    }
  };

  // Değer değiştiğinde veya bileşen mount edildiğinde yüksekliği ayarla
  useEffect(() => {
    if (autosize) {
      adjustHeight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultValue, autosize]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autosize) {
      adjustHeight();
    }

    if (onInput) {
      onInput(e as React.FormEvent<HTMLTextAreaElement>);
    }
  };

  return (
    <Field disabled={disabled} className="flex w-full flex-col space-y-1">
      {label && (
        <Label className="text-sm font-medium text-gray-700 data-[disabled]:opacity-50 dark:text-gray-300">
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
          ref={textareaRef}
          className={clsx(
            nostyle
              ? className
              : [
                  "input",
                  "resize-none",
                  Icon && "input-with-icon",
                  error ? "input-error" : "input-default",
                ],
            "w-full"
          )}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onInput={handleInput}
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
