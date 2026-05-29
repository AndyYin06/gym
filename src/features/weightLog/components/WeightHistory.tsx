import { Text, View } from "react-native";

import { WeightEntry, WeightUnit } from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";
import { WeightHistoryItem } from "./WeightHistoryItem";

type WeightHistoryProps = {
  entries: WeightEntry[];
  unitPreference: WeightUnit;
  onEdit: (entry: WeightEntry) => void;
  onDelete: (date: string) => void;
};

export function WeightHistory({
  entries,
  unitPreference,
  onEdit,
  onDelete
}: WeightHistoryProps) {
  return (
    <>
      <View style={styles.historyHeader}>
        <Text style={styles.sectionTitle}>History</Text>
        <Text style={styles.historyCount}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </Text>
      </View>

      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No weights logged yet.</Text>
          <Text style={styles.emptyBody}>Add today&apos;s weight to start your history.</Text>
        </View>
      ) : (
        <View style={styles.historyList}>
          {entries.map((entry) => (
            <WeightHistoryItem
              entry={entry}
              key={entry.date}
              onDelete={onDelete}
              onEdit={onEdit}
              unitPreference={unitPreference}
            />
          ))}
        </View>
      )}
    </>
  );
}
