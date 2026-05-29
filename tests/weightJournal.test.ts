import { describe, expect, it } from "vitest";

import {
  EMPTY_JOURNAL,
  convertWeight,
  formatWeight,
  hydrateJournal,
  parseWeightInput,
  sortEntriesNewestFirst,
  upsertEntry
} from "../src/domain/weightJournal";

describe("weight journal", () => {
  it("upserts one entry per local date", () => {
    const first = upsertEntry(
      EMPTY_JOURNAL,
      { date: "2026-05-28", weight: 180, unit: "lb" },
      "2026-05-28T10:00:00.000Z"
    );
    const updated = upsertEntry(
      first,
      { date: "2026-05-28", weight: 181.2, unit: "lb" },
      "2026-05-28T11:00:00.000Z"
    );

    expect(updated.entries).toHaveLength(1);
    expect(updated.entries[0]).toMatchObject({
      date: "2026-05-28",
      weight: 181.2,
      createdAt: "2026-05-28T10:00:00.000Z",
      updatedAt: "2026-05-28T11:00:00.000Z"
    });
  });

  it("sorts entries newest first", () => {
    const entries = sortEntriesNewestFirst([
      {
        date: "2026-05-26",
        weight: 180,
        unit: "lb",
        createdAt: "now",
        updatedAt: "now"
      },
      {
        date: "2026-05-28",
        weight: 178,
        unit: "lb",
        createdAt: "now",
        updatedAt: "now"
      },
      {
        date: "2026-05-27",
        weight: 179,
        unit: "lb",
        createdAt: "now",
        updatedAt: "now"
      }
    ]);

    expect(entries.map((entry) => entry.date)).toEqual([
      "2026-05-28",
      "2026-05-27",
      "2026-05-26"
    ]);
  });

  it("converts and displays weights to one decimal place", () => {
    expect(convertWeight(100, "kg", "lb")).toBeCloseTo(220.462, 3);
    expect(convertWeight(220.46226218, "lb", "kg")).toBeCloseTo(100, 3);
    expect(formatWeight(100, "kg", "lb")).toBe("220.5");
  });

  it("rejects invalid weight inputs", () => {
    expect(parseWeightInput("")).toEqual({ valid: false, message: "Enter a weight." });
    expect(parseWeightInput("abc")).toEqual({
      valid: false,
      message: "Use a valid number."
    });
    expect(parseWeightInput("0")).toEqual({
      valid: false,
      message: "Weight must be greater than zero."
    });
    expect(parseWeightInput("-10")).toEqual({
      valid: false,
      message: "Weight must be greater than zero."
    });
  });

  it("hydrates only valid persisted entries", () => {
    const journal = hydrateJournal({
      unitPreference: "kg",
      entries: [
        {
          date: "2026-05-28",
          weight: 81.3,
          unit: "kg",
          createdAt: "2026-05-28T10:00:00.000Z",
          updatedAt: "2026-05-28T10:00:00.000Z"
        },
        {
          date: "not-a-date",
          weight: 81.3,
          unit: "kg",
          createdAt: "now",
          updatedAt: "now"
        }
      ]
    });

    expect(journal.unitPreference).toBe("kg");
    expect(journal.entries).toHaveLength(1);
  });
});
