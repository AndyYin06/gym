export type WeightUnit = "lb" | "kg";

export type WeightEntry = {
  date: string;
  weight: number;
  unit: WeightUnit;
  createdAt: string;
  updatedAt: string;
};

export type WeightJournal = {
  version: 1;
  unitPreference: WeightUnit;
  entries: WeightEntry[];
};

export type EntryInput = {
  date: string;
  weight: number;
  unit: WeightUnit;
};

export type EntryValidationResult =
  | { valid: true; weight: number }
  | { valid: false; message: string };

export type WeightTrendPoint = {
  date: string;
  displayWeight: number;
  unit: WeightUnit;
};

export const EMPTY_JOURNAL: WeightJournal = {
  version: 1,
  unitPreference: "lb",
  entries: []
};

const LB_PER_KG = 2.2046226218;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function todayLocalDate(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function validateDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}

export function parseWeightInput(value: string): EntryValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: "Enter a weight." };
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed)) {
    return { valid: false, message: "Use a valid number." };
  }

  if (parsed <= 0) {
    return { valid: false, message: "Weight must be greater than zero." };
  }

  return { valid: true, weight: Math.round(parsed * 10) / 10 };
}

export function convertWeight(
  weight: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  if (fromUnit === toUnit) {
    return weight;
  }

  return fromUnit === "kg" ? weight * LB_PER_KG : weight / LB_PER_KG;
}

export function formatWeight(
  weight: number,
  fromUnit: WeightUnit,
  displayUnit: WeightUnit
): string {
  return convertWeight(weight, fromUnit, displayUnit).toFixed(1);
}

export function sortEntriesNewestFirst(entries: WeightEntry[]): WeightEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

export function getWeightTrendPoints(
  entries: WeightEntry[],
  displayUnit: WeightUnit
): WeightTrendPoint[] {
  return [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({
      date: entry.date,
      displayWeight: convertWeight(entry.weight, entry.unit, displayUnit),
      unit: displayUnit
    }));
}

export function upsertEntry(
  journal: WeightJournal,
  input: EntryInput,
  timestamp = new Date().toISOString()
): WeightJournal {
  const existing = journal.entries.find((entry) => entry.date === input.date);
  const nextEntry: WeightEntry = {
    date: input.date,
    weight: input.weight,
    unit: input.unit,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp
  };

  const entries = existing
    ? journal.entries.map((entry) => (entry.date === input.date ? nextEntry : entry))
    : [...journal.entries, nextEntry];

  return {
    ...journal,
    entries: sortEntriesNewestFirst(entries)
  };
}

export function deleteEntry(journal: WeightJournal, date: string): WeightJournal {
  return {
    ...journal,
    entries: journal.entries.filter((entry) => entry.date !== date)
  };
}

export function setUnitPreference(
  journal: WeightJournal,
  unitPreference: WeightUnit
): WeightJournal {
  return {
    ...journal,
    unitPreference
  };
}

export function hydrateJournal(value: unknown): WeightJournal {
  if (!value || typeof value !== "object") {
    return EMPTY_JOURNAL;
  }

  const candidate = value as Partial<WeightJournal>;
  const unitPreference = candidate.unitPreference === "kg" ? "kg" : "lb";
  const entries = Array.isArray(candidate.entries)
    ? candidate.entries.filter(isWeightEntry)
    : [];

  return {
    version: 1,
    unitPreference,
    entries: sortEntriesNewestFirst(entries)
  };
}

function isWeightEntry(value: unknown): value is WeightEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Partial<WeightEntry>;

  return (
    typeof entry.date === "string" &&
    validateDate(entry.date) &&
    typeof entry.weight === "number" &&
    Number.isFinite(entry.weight) &&
    entry.weight > 0 &&
    (entry.unit === "lb" || entry.unit === "kg") &&
    typeof entry.createdAt === "string" &&
    typeof entry.updatedAt === "string"
  );
}
