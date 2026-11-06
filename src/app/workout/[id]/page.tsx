"use client";

import Image from "next/image";
import { use } from "react";
import { useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types/workout";

type Params = Promise<{ id: string }>;

const DIFF_STYLES: Record<string, string> = {
  Beginner: "bg-green-500/15 text-green-400",
  Intermediate: "bg-yellow-500/15 text-yellow-400",
  Advanced: "bg-red-500/15 text-red-400",
};

export default function WorkoutDetails({ params }: { params: Params }) {
  const { id } = use(params);

  const { plan, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout?.id);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#252836] border-t-[#ccff00]" />
      </div>
    );
  }

  // Not found
  if (!workout) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-semibold text-white">Workout not found!</p>
      </div>
    );
  }

  // Specs
  const specs = [
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Rating", value: `⭐ ${workout.rating}` },
    { label: "Equipment", value: workout.equipment },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: image */}
        <figure className="relative min-h-[340px] overflow-hidden rounded-2xl border border-[#252836] bg-[#1a1d27] lg:min-h-[560px]">
          <Image
            src={workout.image}
            alt={`${workout.name} demonstration`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </figure>

        {/* Right: info */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <h1 className="mb-2 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl oswald">
              {workout.name}
            </h1>
            <p className="leading-relaxed text-[#8b95a9]">
              {workout.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((g) => (
              <span
                key={g}
                className="rounded-full bg-[#ccff00]/15 px-3 py-1 text-sm font-semibold text-[#ccff00]"
              >
                {g}
              </span>
            ))}

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                DIFF_STYLES[workout.difficulty] ?? "bg-[#252836] text-[#8b95a9]"
              }`}
            >
              {workout.difficulty}
            </span>
          </div>

          {/* Key Specs */}
          <div className="rounded-2xl border border-[#252836] bg-[#1a1d27] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#8b95a9]">
              Key Specs
            </p>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((s) => (
                <div key={s.label} className="rounded-xl bg-[#0f1117] p-3">
                  <p className="mb-0.5 text-[10px] uppercase tracking-widest text-[#8b95a9]">
                    {s.label}
                  </p>
                  <p className="font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#8b95a9]">
              Instructions
            </p>

            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-relaxed text-[#8b95a9]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}

              className="btn btn-primary"
            >
              {isAlreadyInPlan
                ? "Already in Plan"
                : isPlanFull
                  ? "Plan Full"
                  : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="btn btn-outline"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
