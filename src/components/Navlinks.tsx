'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navlinks = () => {
    const pathname = usePathname();
    return (
      <div className="flex flex-col lg:flex-row gap-4">
        <Link
          href="/"
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            pathname === "/"
              ? "bg-[#1a1d27] font-semibold text-[#ccff00]  px-2  rounded-2xl"
              : "text-[#8b95a9] hover:bg-[#1a1d27] hover:text-white"
            }`}
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            pathname === "/my-plan"
              ? "bg-[#1a1d27] font-semibold text-[#ccff00]  px-2  rounded-2xl"
              : "text-[#8b95a9] hover:bg-[#1a1d27] hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </div>
    );
};

export default Navlinks;