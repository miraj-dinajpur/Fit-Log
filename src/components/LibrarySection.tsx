"use client";
import { useState, useEffect } from "react";
import { getAllWorkouts } from "@/utils/api";
import { Workout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="container mx-auto px-4 py-12 scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white oswald">The Library</h2>
        <p className="text-gray-300">Twelve lifts covering every major muscle group.</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
