"use client";
import { usePathname } from "next/navigation";
import UniversityFeed from "@/components/feed/UniversityFeed";
import Page from "../go/page";

export default function UniversityPage() {
  const pathname = usePathname();
  const universityId = pathname.split("/")[2];

  return (
    <div className="lg:flex-1">
      {universityId ? <UniversityFeed /> : <Page />}
    </div>
  );
}
