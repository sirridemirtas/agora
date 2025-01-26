"use client";
import { useEffect, useId } from "react";
import { Transition } from "@headlessui/react";
import {
  X,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";

export type SnackbarType = "success" | "error" | "info" | "warning" | "dark";

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: SnackbarType;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoHideDuration?: number;
}

const icons: Record<SnackbarType, LucideIcon> = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  dark: Info,
};

const styles: Record<SnackbarType | "dark", string> = {
  error:
    "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-200 dark:border-red-800",
  success:
    "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800",
  info: "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800",
  warning:
    "bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800",
  dark: "bg-neutral-900 text-neutral-100 border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700",
};

const iconStyles: Record<SnackbarType | "dark", string> = {
  error: "text-red-500 dark:text-red-400",
  success: "text-green-500 dark:text-green-400",
  info: "text-blue-500 dark:text-blue-400",
  warning: "text-yellow-500 dark:text-yellow-400",
  dark: "text-neutral-100 dark:text-neutral-200",
};

export function Snackbar({
  open,
  onClose,
  message,
  type = "dark",
  action,
  autoHideDuration = 5000,
}: SnackbarProps) {
  const id = useId();
  const Icon = icons[type];

  useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <Transition
      show={open}
      as="div"
      className="pointer-events-auto w-full max-w-sm overflow-hidden"
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx("rounded-lg border", styles[type])}
        role="alert"
        aria-labelledby={`${id}-message`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon
                className={clsx("h-5 w-5", iconStyles[type])}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium" id={`${id}-message`}>
                {message}
              </p>
              {action && (
                <div className="mt-2">
                  <button
                    onClick={action.onClick}
                    className={clsx(
                      "text-sm font-medium",
                      type === "error" && "text-red-600 hover:text-red-500",
                      type === "success" &&
                        "text-green-600 hover:text-green-500",
                      type === "info" && "text-blue-600 hover:text-blue-500",
                      type === "warning" &&
                        "text-yellow-600 hover:text-yellow-500"
                    )}
                  >
                    {action.label}
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={clsx(
                  "inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
                  type === "error" &&
                    "text-red-500 hover:text-red-400 focus:ring-red-500",
                  type === "success" &&
                    "text-green-500 hover:text-green-400 focus:ring-green-500",
                  type === "info" &&
                    "text-blue-500 hover:text-blue-400 focus:ring-blue-500",
                  type === "warning" &&
                    "text-yellow-500 hover:text-yellow-400 focus:ring-yellow-500"
                )}
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

// SnackbarContainer component to handle multiple snackbars
export interface SnackbarItem extends Omit<SnackbarProps, "open" | "onClose"> {
  id: string;
}

interface SnackbarContainerProps {
  items: SnackbarItem[];
  onClose: (id: string) => void;
}

export function SnackbarContainer({ items, onClose }: SnackbarContainerProps) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="mb-12 flex w-full flex-col items-center space-y-4 sm:items-end">
        {items.map((item) => (
          <Snackbar
            key={item.id}
            open={true}
            onClose={() => onClose(item.id)}
            message={item.message}
            type={item.type}
            action={item.action}
            autoHideDuration={item.autoHideDuration}
          />
        ))}
      </div>
    </div>
  );
}
