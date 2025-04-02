import clsx from "clsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface DropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ button, children }) => {
  return (
    <Menu as="div" className="relative z-20 inline-block text-left">
      <MenuButton
        as="div"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {button}
      </MenuButton>

      <MenuItems
        className={clsx(
          "absolute right-0 mt-1 origin-top-right rounded-md shadow-lg",
          "bg-white dark:border dark:border-neutral-800 dark:bg-neutral-900",
          "ring-1 ring-black ring-opacity-5 focus:outline-none",
          "min-w-fit"
        )}
      >
        <div className="py-2">{children}</div>
      </MenuItems>
    </Menu>
  );
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <MenuItem>
      {({ focus }) => (
        <button
          className={clsx(
            focus
              ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
              : "text-neutral-700 dark:text-neutral-200",
            "block w-full whitespace-nowrap px-4 py-2 text-left text-sm"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
};

export default DropdownMenu;
