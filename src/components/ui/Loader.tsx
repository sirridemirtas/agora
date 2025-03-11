import { LoaderCircle as LoaderIcon } from "lucide-react";

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <div className="flex h-24 animate-spin items-center justify-center">
      <LoaderIcon size={size} />
    </div>
  );
}
