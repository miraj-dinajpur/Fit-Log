"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, metrics, savedmetrics, removeFromPlan,removeFromSaved } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Active tab অনুযায়ী list select
  const items = activeTab === "plan" ? plan : saved;

  // Original array পরিবর্তন না করে sorting
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="space-y-8">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white font-['Oswald']">
              My Plan
            </h1>
            <p className="mt-1 text-sm text-[#8b95a9]">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>
        </div>

        {/* ── Stats cards ─────────────────────────────────── */}
        <div className="grid grid-cols-1 divide-y divide-[#252836] rounded-2xl border border-[#252836] bg-[#1a1d27] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            {
              label: "Exercises",
              value: `${activeTab === "plan" ? metrics.exercises : savedmetrics.exercises}`,
            },
            {
              label: "Minutes",
              value: `${activeTab === "plan" ? metrics.minutes : savedmetrics.minutes}`,
            },
            {
              label: "Calories",
              value: `${activeTab === "plan" ? metrics.calories : savedmetrics.calories}`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-1 py-6"
            >
              <span className="text-4xl font-bold text-[#ccff00] font-['Oswald']">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#8b95a9]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Tabs and Sort ───────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex w-fit gap-1 rounded-2xl bg-[#1a1d27] p-1">
            {(["plan", "saved"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-[#252836] text-[#ccff00]"
                    : "text-[#8b95a9] hover:text-white"
                }`}
              >
                {tab === "plan" ? "Today's Plan" : "Saved"}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-[#252836] bg-[#1a1d27] px-4 py-2 text-sm text-white outline-none focus:border-[#ccff00]"
            aria-label="Sort workouts"
          >
            <option value="duration">Sort by Duration</option>
            <option value="calories">Sort by Calories</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* ── Empty state ─────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#252836] bg-[#1a1d27] p-10 text-center">
            <p className="mb-2 text-2xl font-bold uppercase text-white font-['Oswald']">
              Nothing Here Yet
            </p>
            <p className="mb-6 text-sm text-[#8b95a9]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#ccff00] px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-90"
            >
              Go to Workouts
            </Link>
          </div>
        ) : (
          /* ── Workout list ───────────────────────────────── */
          <div className="space-y-4">
            {sortedItems.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center gap-4 rounded-2xl border border-[#252836] bg-[#1a1d27] p-4 transition hover:border-[#ccff00]/40"
              >
                {/* Thumbnail */}
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#252836]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-white font-['Oswald']">
                    {workout.name}
                  </p>
                  <p className="text-sm text-[#8b95a9]">{workout.equipment}</p>
                  <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-[#8b95a9]">
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5 text-[#ccff00]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {workout.duration} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5 text-[#ccff00]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h3V8h2v4h3l-4 4z" />
                      </svg>
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5 text-[#ccff00]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* View Details */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="flex-shrink-0 cursor-pointer rounded-xl border border-[#252836] px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                      toast.success("Marked as done!");
                    }}
                    className="ml-2 flex-shrink-0 hover:brightness-75 cursor-pointer rounded-xl border bg-[#c4f000] border-[#252836] px-4 py-2 text-xs font-semibold text-black transition "
                  >
                    Mark as Done
                  </button>

                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    className="ml-2 flex-shrink-0 cursor-pointer rounded-xl border border-[#252836] px-4 py-2 text-xs font-semibold text-[#8b95a9] transition hover:border-red-500 hover:text-red-500"
                  >
                    <X />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
