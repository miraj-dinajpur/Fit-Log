'use client';
import { usePlan } from '@/context/PlanContext';
import Link from 'next/link';
import React from 'react';

const NavBadge = () => {
    const { plan, saved } = usePlan();
    return (
      <div className="flex gap-4">
        <Link href="/my-plan" className="flex gap-2">
          Plan
          <span className="bg-[#ccff00] rounded-full px-3 text-black py-1 text-xs font-bold">
            {plan.length}
          </span>
        </Link>
        <Link href="/my-plan" className="flex gap-2">
          Saved
          <span className=" text-white border rounded-full px-3 py-1 text-xs font-bold">
            {saved.length}
          </span>
        </Link>
      </div>
    );
};

export default NavBadge;