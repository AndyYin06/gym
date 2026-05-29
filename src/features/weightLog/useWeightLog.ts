import { useEffect, useMemo, useState } from "react";

import {
  WeightEntry,
  WeightJournal,
  WeightUnit,
  deleteEntry,
  parseWeightInput,
  setUnitPreference as setJournalUnitPreference,
  todayLocalDate,
  upsertEntry,
  validateDate
} from "../../domain/weightJournal";
import {
  loadWeightJournal,
  saveWeightJournal
} from "../../storage/weightJournalStorage";

export function useWeightLog() {
  const [journal, setJournal] = useState<WeightJournal | null>(null);
  const [date, setDate] = useState(todayLocalDate());
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("lb");
  const [editingEntry, setEditingEntry] = useState<WeightEntry | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    loadWeightJournal().then((loadedJournal) => {
      if (!mounted) {
        return;
      }

      setJournal(loadedJournal);
      setUnit(loadedJournal.unitPreference);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const existingEntry = useMemo(() => {
    return journal?.entries.find((entry) => entry.date === date);
  }, [date, journal?.entries]);

  async function persist(nextJournal: WeightJournal) {
    setJournal(nextJournal);
    await saveWeightJournal(nextJournal);
  }

  async function setUnitPreference(nextUnit: WeightUnit) {
    setUnit(nextUnit);

    if (!journal) {
      return;
    }

    await persist(setJournalUnitPreference(journal, nextUnit));
  }

  async function saveEntry() {
    if (!journal) {
      return;
    }

    setError("");
    setMessage("");

    if (!validateDate(date)) {
      setError("Use a valid date in YYYY-MM-DD format.");
      return;
    }

    const parsedWeight = parseWeightInput(weight);

    if (!parsedWeight.valid) {
      setError(parsedWeight.message);
      return;
    }

    const nextJournal = upsertEntry(journal, {
      date,
      weight: parsedWeight.weight,
      unit
    });

    await persist(nextJournal);
    setMessage(existingEntry ? "Entry updated." : "Entry saved.");
    setWeight("");
    setEditingEntry(null);
  }

  function startEditing(entry: WeightEntry) {
    setEditingEntry(entry);
    setDate(entry.date);
    setWeight(String(entry.weight));
    setUnit(entry.unit);
    setError("");
    setMessage("");
  }

  function resetForm() {
    const today = todayLocalDate();
    setDate(today);
    setWeight("");
    setUnit(journal?.unitPreference ?? "lb");
    setEditingEntry(null);
    setError("");
    setMessage("");
  }

  async function deleteEntryByDate(entryDate: string) {
    if (!journal) {
      return;
    }

    await persist(deleteEntry(journal, entryDate));

    if (editingEntry?.date === entryDate) {
      resetForm();
    }
  }

  return {
    journal,
    isLoading: !journal,
    today: todayLocalDate(),
    date,
    weight,
    unit,
    editingEntry,
    existingEntry,
    error,
    message,
    setDate,
    setWeight,
    setUnit,
    setUnitPreference,
    saveEntry,
    startEditing,
    resetForm,
    deleteEntryByDate
  };
}
