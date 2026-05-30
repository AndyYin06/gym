import { Text, View } from "react-native";

import { RoutineEntry } from "../../../domain/routineJournal";
import { styles } from "../../weightLog/weightLog.styles";
import { RoutineHistoryItem } from "./RoutineHistoryItem";

type RoutineHistoryProps = {
  entries: RoutineEntry[];
  onDelete: (id: string) => void;
};

export function RoutineHistory({ entries, onDelete }: RoutineHistoryProps) {
  return (
    <>
      <View style={styles.historyHeader}>
        <Text style={styles.sectionTitle}>Routine History</Text>
        <Text style={styles.historyCount}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </Text>
      </View>

      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No routines logged yet.</Text>
          <Text style={styles.emptyBody}>Tap + to choose an exercise.</Text>
        </View>
      ) : (
        <View style={styles.historyList}>
          {entries.map((entry) => (
            <RoutineHistoryItem entry={entry} key={entry.id} onDelete={onDelete} />
          ))}
        </View>
      )}
    </>
  );
}
