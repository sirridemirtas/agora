"use client";
import { useState } from "react";
import { Switch } from "@/components/ui";

export default function ToggleProfilePrivacy() {
  const [isPrivate, setIsPrivate] = useState(false);
  return (
    <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
  );
}
