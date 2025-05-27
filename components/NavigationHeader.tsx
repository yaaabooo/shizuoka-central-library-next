"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationHeader() {
  const pathname = usePathname();

  return (
    <div className="bg-white shadow-md px-6 py-4 flex gap-4">
      <Link
        href="/trainings/by-staff/"
        className={`px-4 py-2 rounded-full font-semibold ${
          pathname === "/trainings/by-staff"
            ? "bg-indigo-500 text-white"
            : "bg-white text-indigo-500 border border-indigo-500"
        }`}
      >
        司書別表示
      </Link>
      <Link
        href="/trainings/by-program/"
        className={`px-4 py-2 rounded-full font-semibold ${
          pathname === "/trainings/by-program"
            ? "bg-green-500 text-white"
            : "bg-white text-green-500 border border-green-500"
        }`}
      >
        研修別表示
      </Link>
    </div>
  );
}
