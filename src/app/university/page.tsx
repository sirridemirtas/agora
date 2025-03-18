"use client";
import UniversityFeed from "@/components/feed/UniversityFeed";
//import { universities } from "@/constants/universities";

/* export async function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.id,
  }));
} */

export default function UniversityPage() {
  return (
    <div className="lg:flex-1">
      <UniversityFeed />
    </div>
  );
}
