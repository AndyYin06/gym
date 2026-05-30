import { describe, expect, it } from "vitest";

import {
  EMPTY_ROUTINE_JOURNAL,
  addRoutineEntry,
  deleteRoutineEntry,
  hydrateRoutineJournal,
  parseRoutineEntryInput,
  sortRoutineEntriesNewestFirst
} from "../src/domain/routineJournal";

describe("routine journal", () => {
  it("saves weighted exercise entries with a created timestamp", () => {
    const journal = addRoutineEntry(
      EMPTY_ROUTINE_JOURNAL,
      {
        date: "2026-05-29",
        exerciseId: "squat",
        sets: 3,
        reps: 5,
        weight: 225,
        unit: "lb"
      },
      "2026-05-29T10:00:00.000Z",
      "entry-1"
    );

    expect(journal.entries).toEqual([
      {
        id: "entry-1",
        date: "2026-05-29",
        exerciseId: "squat",
        sets: 3,
        reps: 5,
        weight: 225,
        unit: "lb",
        createdAt: "2026-05-29T10:00:00.000Z"
      }
    ]);
  });

  it("sorts routine entries newest first", () => {
    const entries = sortRoutineEntriesNewestFirst([
      {
        id: "older",
        date: "2026-05-28",
        exerciseId: "bench-press",
        sets: 3,
        reps: 5,
        weight: 135,
        unit: "lb",
        createdAt: "2026-05-28T10:00:00.000Z"
      },
      {
        id: "newer",
        date: "2026-05-29",
        exerciseId: "squat",
        sets: 5,
        reps: 5,
        weight: 225,
        unit: "lb",
        createdAt: "2026-05-29T10:00:00.000Z"
      }
    ]);

    expect(entries.map((entry) => entry.id)).toEqual(["newer", "older"]);
  });

  it("rejects invalid routine inputs", () => {
    expect(
      parseRoutineEntryInput({
        date: "not-a-date",
        exerciseId: "squat",
        sets: "3",
        reps: "5",
        weight: "225",
        unit: "lb"
      })
    ).toEqual({ valid: false, message: "Use a valid date in YYYY-MM-DD format." });

    expect(
      parseRoutineEntryInput({
        date: "2026-05-29",
        exerciseId: "",
        sets: "3",
        reps: "5",
        weight: "225",
        unit: "lb"
      })
    ).toEqual({ valid: false, message: "Choose an exercise." });

    expect(
      parseRoutineEntryInput({
        date: "2026-05-29",
        exerciseId: "squat",
        sets: "1.5",
        reps: "5",
        weight: "225",
        unit: "lb"
      })
    ).toEqual({ valid: false, message: "Use a whole number for sets." });

    expect(
      parseRoutineEntryInput({
        date: "2026-05-29",
        exerciseId: "squat",
        sets: "3",
        reps: "0",
        weight: "225",
        unit: "lb"
      })
    ).toEqual({ valid: false, message: "Reps must be greater than zero." });

    expect(
      parseRoutineEntryInput({
        date: "2026-05-29",
        exerciseId: "squat",
        sets: "3",
        reps: "5",
        weight: "-225",
        unit: "lb"
      })
    ).toEqual({ valid: false, message: "Weight must be greater than zero." });
  });

  it("hydrates only valid persisted routine entries", () => {
    const journal = hydrateRoutineJournal({
      entries: [
        {
          id: "valid",
          date: "2026-05-29",
          exerciseId: "bench-press",
          sets: 3,
          reps: 8,
          weight: 135,
          unit: "lb",
          createdAt: "2026-05-29T10:00:00.000Z"
        },
        {
          id: "invalid-exercise",
          date: "2026-05-29",
          exerciseId: "curl",
          sets: 3,
          reps: 8,
          weight: 135,
          unit: "lb",
          createdAt: "2026-05-29T10:00:00.000Z"
        }
      ]
    });

    expect(journal.entries.map((entry) => entry.id)).toEqual(["valid"]);
  });

  it("deletes routine entries by id", () => {
    const journal = {
      version: 1 as const,
      entries: [
        {
          id: "keep",
          date: "2026-05-29",
          exerciseId: "squat" as const,
          sets: 3,
          reps: 5,
          weight: 225,
          unit: "lb" as const,
          createdAt: "2026-05-29T10:00:00.000Z"
        },
        {
          id: "delete",
          date: "2026-05-28",
          exerciseId: "bench-press" as const,
          sets: 3,
          reps: 8,
          weight: 135,
          unit: "lb" as const,
          createdAt: "2026-05-28T10:00:00.000Z"
        }
      ]
    };

    expect(deleteRoutineEntry(journal, "delete").entries.map((entry) => entry.id)).toEqual([
      "keep"
    ]);
  });
});
