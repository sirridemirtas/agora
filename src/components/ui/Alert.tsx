"use client";

import { useId, useState, useEffect } from "react";
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

export type AlertType = "success" | "error" | "info" | "warning" | "dark";

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  show?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  showIcon?: boolean;
  className?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: LucideIcon;
    className: string;
    titleColor: string;
    defaultTitle?: string;
  }
> = {
  success: {
    icon: CheckCircle,
    className:
      "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-200/20",
    titleColor: "text-green-800 dark:text-green-200",
  },
  error: {
    icon: AlertCircle,
    className:
      "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-200/20",
    titleColor: "text-red-800 dark:text-red-200",
  },
  info: {
    icon: Info,
    className:
      "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-200/20",
    titleColor: "text-blue-800 dark:text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-200/20",
    titleColor: "text-yellow-800 dark:text-yellow-200",
  },
  dark: {
    icon: Info,
    className:
      "bg-gray-800 dark:bg-gray-700 text-white border-gray-600 dark:border-gray-600",
    titleColor: "text-white",
  },
};

export default function Alert({
  type = "info",
  title,
  message,
  show = true,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  showIcon = true,
  className, // Destructure className from props
}: AlertProps) {
  const id = useId();
  const {
    icon: Icon,
    className: typeClassName,
    titleColor,
  } = alertConfig[type];
  const [isVisible, setIsVisible] = useState(show);

  // Handle auto-close functionality
  useEffect(() => {
    setIsVisible(show);

    if (show && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseTime, onClose]);

  return (
    <Transition
      show={isVisible}
      enter="transition-all duration-300"
      enterFrom="opacity-0 transform -translate-y-2"
      enterTo="opacity-100 transform translate-y-0"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 transform translate-y-0"
      leaveTo="opacity-0 transform -translate-y-2"
    >
      <div
        className={clsx(
          "flex items-start rounded-xl p-4",
          "border",
          typeClassName,
          className // Apply custom className from props
        )}
        role="alert"
        aria-live="assertive"
        id={id}
      >
        {showIcon && (
          <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        )}
        <div className={clsx("w-full", showIcon && "ml-3")}>
          {title && (
            <h3 className={clsx("mb-1 text-sm font-medium", titleColor)}>
              {title}
            </h3>
          )}
          <div className="text-sm">{message}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className={clsx(
              "-mx-1.5 -my-1.5 ml-auto rounded-lg p-1.5",
              "focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
              "hover:bg-gray-500 hover:bg-opacity-20",
              "transition-colors duration-200"
            )}
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </Transition>
  );
}
