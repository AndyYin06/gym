import AsyncStorage from "@react-native-async-storage/async-storage";

import { EMPTY_JOURNAL, hydrateJournal, WeightJournal } from "../domain/weightJournal";

const STORAGE_KEY = "gym.weightJournal.v1";

export async function loadWeightJournal(): Promise<WeightJournal> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return EMPTY_JOURNAL;
  }

  try {
    return hydrateJournal(JSON.parse(raw));
  } catch {
    return EMPTY_JOURNAL;
  }
}

export async function saveWeightJournal(journal: WeightJournal): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(journal));
}
