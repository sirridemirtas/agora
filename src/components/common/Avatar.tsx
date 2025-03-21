import clsx from "clsx";

export default function Avatar({
  username = "janedoe",
  size,
}: {
  username?: string;
  size?: number;
}) {
  return (
    <div
      className={clsx(
        size ? `h-${size} w-${size}` : "h-auto w-auto",
        "pointer-events-none flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
        alt={`${username} kişisinin profil resmi`}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
