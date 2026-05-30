import {
  WeightUnit,
  parseWeightInput,
  validateDate
} from "./weightJournal";

export type ExerciseId = "bench-press" | "squat" | "stiff-leg-deadlift";

export type Exercise = {
  id: ExerciseId;
  name: string;
};

export type RoutineEntry = {
  id: string;
  date: string;
  exerciseId: ExerciseId;
  sets: number;
  reps: number;
  weight: number;
  unit: WeightUnit;
  createdAt: string;
};

export type RoutineJournal = {
  version: 1;
  entries: RoutineEntry[];
};

export type RoutineEntryInput = {
  date: string;
  exerciseId: ExerciseId;
  sets: number;
  reps: number;
  weight: number;
  unit: WeightUnit;
};

export type RoutineValidationResult =
  | { valid: true; entry: RoutineEntryInput }
  | { valid: false; message: string };

export const AVAILABLE_EXERCISES: Exercise[] = [
  { id: "bench-press", name: "Bench Press" },
  { id: "squat", name: "Squat" },
  { id: "stiff-leg-deadlift", name: "Stiff-Leg Deadlift" }
];

export const EMPTY_ROUTINE_JOURNAL: RoutineJournal = {
  version: 1,
  entries: []
};

export function getExerciseName(exerciseId: ExerciseId): string {
  return (
    AVAILABLE_EXERCISES.find((exercise) => exercise.id === exerciseId)?.name ??
    "Exercise"
  );
}

export function isExerciseId(value: unknown): value is ExerciseId {
  return (
    typeof value === "string" &&
    AVAILABLE_EXERCISES.some((exercise) => exercise.id === value)
  );
}

export function parseRoutineEntryInput(input: {
  date: string;
  exerciseId: ExerciseId | "";
  sets: string;
  reps: string;
  weight: string;
  unit: WeightUnit;
}): RoutineValidationResult {
  if (!validateDate(input.date)) {
    return { valid: false, message: "Use a valid date in YYYY-MM-DD format." };
  }

  if (!isExerciseId(input.exerciseId)) {
    return { valid: false, message: "Choose an exercise." };
  }

  const sets = parsePositiveInteger(input.sets, "sets");

  if (!sets.valid) {
    return sets;
  }

  const reps = parsePositiveInteger(input.reps, "reps");

  if (!reps.valid) {
    return reps;
  }

  const parsedWeight = parseWeightInput(input.weight);

  if (!parsedWeight.valid) {
    return parsedWeight;
  }

  return {
    valid: true,
    entry: {
      date: input.date,
      exerciseId: input.exerciseId,
      sets: sets.value,
      reps: reps.value,
      weight: parsedWeight.weight,
      unit: input.unit
    }
  };
}

export function addRoutineEntry(
  journal: RoutineJournal,
  input: RoutineEntryInput,
  timestamp = new Date().toISOString(),
  id = createRoutineEntryId(timestamp)
): RoutineJournal {
  return {
    ...journal,
    entries: sortRoutineEntriesNewestFirst([
      ...journal.entries,
      {
        id,
        ...input,
        createdAt: timestamp
      }
    ])
  };
}

export function deleteRoutineEntry(
  journal: RoutineJournal,
  id: string
): RoutineJournal {
  return {
    ...journal,
    entries: journal.entries.filter((entry) => entry.id !== id)
  };
}

export function sortRoutineEntriesNewestFirst(
  entries: RoutineEntry[]
): RoutineEntry[] {
  return [...entries].sort((a, b) => {
    const dateComparison = b.date.localeCompare(a.date);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function hydrateRoutineJournal(value: unknown): RoutineJournal {
  if (!value || typeof value !== "object") {
    return EMPTY_ROUTINE_JOURNAL;
  }

  const candidate = value as Partial<RoutineJournal>;
  const entries = Array.isArray(candidate.entries)
    ? candidate.entries.filter(isRoutineEntry)
    : [];

  return {
    version: 1,
    entries: sortRoutineEntriesNewestFirst(entries)
  };
}

function parsePositiveInteger(
  value: string,
  fieldName: string
): { valid: true; value: number } | { valid: false; message: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: `Enter ${fieldName}.` };
  }

  const parsed = Number(trimmed);

  if (!Number.isInteger(parsed)) {
    return { valid: false, message: `Use a whole number for ${fieldName}.` };
  }

  if (parsed <= 0) {
    return { valid: false, message: `${capitalize(fieldName)} must be greater than zero.` };
  }

  return { valid: true, value: parsed };
}

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function createRoutineEntryId(timestamp: string): string {
  return `${timestamp}-${Math.random().toString(36).slice(2, 10)}`;
}

function isRoutineEntry(value: unknown): value is RoutineEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Partial<RoutineEntry>;

  return (
    typeof entry.id === "string" &&
    typeof entry.date === "string" &&
    validateDate(entry.date) &&
    isExerciseId(entry.exerciseId) &&
    typeof entry.sets === "number" &&
    Number.isInteger(entry.sets) &&
    entry.sets > 0 &&
    typeof entry.reps === "number" &&
    Number.isInteger(entry.reps) &&
    entry.reps > 0 &&
    typeof entry.weight === "number" &&
    Number.isFinite(entry.weight) &&
    entry.weight > 0 &&
    (entry.unit === "lb" || entry.unit === "kg") &&
    typeof entry.createdAt === "string"
  );
}
