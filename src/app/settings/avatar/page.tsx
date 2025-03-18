"use client";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks";

export default function AvatarPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Avatarı Düzenle");
  }, [setTitle]);

  return (
    <div className="p-6 lg:flex-1">
      <h1>Avatar Edit</h1>
    </div>
  );
}
