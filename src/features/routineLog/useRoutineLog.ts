import { useEffect, useMemo, useState } from "react";

import {
  AVAILABLE_EXERCISES,
  Exercise,
  ExerciseId,
  RoutineJournal,
  addRoutineEntry,
  deleteRoutineEntry,
  parseRoutineEntryInput
} from "../../domain/routineJournal";
import { WeightUnit, todayLocalDate } from "../../domain/weightJournal";
import { loadRoutineJournal, saveRoutineJournal } from "../../storage/routineJournalStorage";
import { loadWeightJournal } from "../../storage/weightJournalStorage";

export function useRoutineLog() {
  const [journal, setJournal] = useState<RoutineJournal | null>(null);
  const [date, setDate] = useState(todayLocalDate());
  const [exerciseId, setExerciseId] = useState<ExerciseId | "">("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("lb");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isExerciseSheetVisible, setExerciseSheetVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all([loadRoutineJournal(), loadWeightJournal()]).then(
      ([loadedRoutineJournal, loadedWeightJournal]) => {
        if (!mounted) {
          return;
        }

        setJournal(loadedRoutineJournal);
        setUnit(loadedWeightJournal.unitPreference);
      }
    );

    return () => {
      mounted = false;
    };
  }, []);

  const selectedExercise = useMemo(() => {
    return (
      AVAILABLE_EXERCISES.find((exercise) => exercise.id === exerciseId) ?? null
    );
  }, [exerciseId]);

  async function persist(nextJournal: RoutineJournal) {
    setJournal(nextJournal);
    await saveRoutineJournal(nextJournal);
  }

  function openExerciseSheet() {
    setError("");
    setMessage("");
    setExerciseSheetVisible(true);
  }

  function closeExerciseSheet() {
    setExerciseSheetVisible(false);
  }

  function selectExercise(exercise: Exercise) {
    setExerciseId(exercise.id);
    setDate(todayLocalDate());
    setSets("");
    setReps("");
    setWeight("");
    setError("");
    setMessage("");
    setFormVisible(true);
    setExerciseSheetVisible(false);
  }

  function resetForm() {
    setDate(todayLocalDate());
    setExerciseId("");
    setSets("");
    setReps("");
    setWeight("");
    setError("");
    setMessage("");
    setFormVisible(false);
  }

  async function saveEntry() {
    if (!journal) {
      return;
    }

    setError("");
    setMessage("");

    const parsed = parseRoutineEntryInput({
      date,
      exerciseId,
      sets,
      reps,
      weight,
      unit
    });

    if (!parsed.valid) {
      setError(parsed.message);
      return;
    }

    await persist(addRoutineEntry(journal, parsed.entry));
    setMessage("Routine logged.");
    setSets("");
    setReps("");
    setWeight("");
  }

  async function deleteEntryById(id: string) {
    if (!journal) {
      return;
    }

    await persist(deleteRoutineEntry(journal, id));
  }

  return {
    exercises: AVAILABLE_EXERCISES,
    journal,
    isLoading: !journal,
    date,
    exerciseId,
    selectedExercise,
    sets,
    reps,
    weight,
    unit,
    error,
    message,
    isExerciseSheetVisible,
    isFormVisible,
    setDate,
    setSets,
    setReps,
    setWeight,
    setUnit,
    openExerciseSheet,
    closeExerciseSheet,
    selectExercise,
    resetForm,
    saveEntry,
    deleteEntryById
  };
}
