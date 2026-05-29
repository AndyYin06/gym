import { Alert, Pressable, Text, View } from "react-native";

import {
  WeightEntry,
  WeightUnit,
  formatWeight
} from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";

type WeightHistoryItemProps = {
  entry: WeightEntry;
  unitPreference: WeightUnit;
  onEdit: (entry: WeightEntry) => void;
  onDelete: (date: string) => void;
};

export function WeightHistoryItem({
  entry,
  unitPreference,
  onEdit,
  onDelete
}: WeightHistoryItemProps) {
  function confirmDelete() {
    Alert.alert("Delete entry?", `${entry.date} will be removed from history.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(entry.date)
      }
    ]);
  }

  return (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyDate}>{entry.date}</Text>
        <Text style={styles.historyMeta}>
          saved as {entry.weight.toFixed(1)} {entry.unit}
        </Text>
      </View>
      <View style={styles.historyActions}>
        <Text style={styles.historyWeight}>
          {formatWeight(entry.weight, entry.unit, unitPreference)} {unitPreference}
        </Text>
        <View style={styles.actionRow}>
          <Pressable style={styles.smallButton} onPress={() => onEdit(entry)}>
            <Text style={styles.smallButtonLabel}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.smallButton, styles.deleteButton]}
            onPress={confirmDelete}
          >
            <Text style={[styles.smallButtonLabel, styles.deleteButtonLabel]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
