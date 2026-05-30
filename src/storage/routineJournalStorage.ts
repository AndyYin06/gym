import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  EMPTY_ROUTINE_JOURNAL,
  RoutineJournal,
  hydrateRoutineJournal
} from "../domain/routineJournal";

const STORAGE_KEY = "gym.routineJournal.v1";

export async function loadRoutineJournal(): Promise<RoutineJournal> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return EMPTY_ROUTINE_JOURNAL;
  }

  try {
    return hydrateRoutineJournal(JSON.parse(raw));
  } catch {
    return EMPTY_ROUTINE_JOURNAL;
  }
}

export async function saveRoutineJournal(
  journal: RoutineJournal
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(journal));
}
