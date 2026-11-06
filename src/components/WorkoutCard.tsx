import { Workout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <div>
      <Link
        href={`/workout/${workout.id}`}
        className="group flex flex-col rounded-2xl border border-[#252836] bg-[#1a1d27] transition hover:border-[#ccff00]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
      >
        <figure className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-[#252836]">
          <Image
            src={workout.image}
            alt={`${workout.name} demonstration`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </figure>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((g) => (
              <span
                key={g}
                className="rounded-full bg-[#ccff00]/15 px-2.5 py-0.5 text-xs font-semibold text-[#ccff00]"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold tracking-tight text-white font-['Oswald']">
            {workout.name}
          </h2>

          {/* Equipment */}
          <p className="text-sm text-[#8b95a9]">{workout.equipment}</p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#8b95a9]">
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {workout.duration} min
            </span>
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
              {workout.caloriesBurned} kcal
            </span>
            <span className="inline-flex items-center gap-1">
              <svg
                className="h-4 w-4 text-[#ccff00]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {workout.rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkoutCard;
