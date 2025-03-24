"use client";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks";
import { AvatarEditor } from "@/components/form";

export default function AvatarPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Avatarı Düzenle");
  }, [setTitle]);

  return (
    <div className="p-6 lg:flex-1">
      <AvatarEditor />
    </div>
  );
}
