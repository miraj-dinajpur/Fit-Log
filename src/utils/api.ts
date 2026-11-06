import { Workout } from "@/types/workout";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return data;
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

  if (!res.ok) throw new Error("Failed to fetch workout");

  const data = await res.json();
  return data;
}