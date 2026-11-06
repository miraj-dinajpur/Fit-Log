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
          className={
            pathname === "/"
              ? "bg-[#1a1d27] font-semibold text-[#ccff00] border px-2 border-white rounded-2xl"
              : "text-[#8b95a9] hover:bg-[#1a1d27] hover:text-white"
          }
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-[#ccff00] border border-white px-2 rounded-2xl bg-[#1a1d27] font-semibold" : "text-[#8b95a9] hover:bg-[#1a1d27] hover:text-white"}
        >
          My Plan
        </Link>
      </div>
    );
};

export default Navlinks;