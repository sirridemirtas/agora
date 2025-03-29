import clsx from "clsx";

export default function UserRoleBadge({
  role,
  className,
}: {
  role: number;
  className?: string;
}) {
  if (role === 0 || role > 2) return null;
  return (
    <span
      className={clsx(
        "rounded-md bg-red-100 px-2 text-sm text-red-800 dark:bg-red-900 dark:text-red-300",
        className
      )}
    >
      {role === 1 && "moderatör"}
      {role === 2 && "admin"}
    </span>
  );
}
