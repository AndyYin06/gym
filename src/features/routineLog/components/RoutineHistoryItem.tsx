import { Alert, Pressable, Text, View } from "react-native";

import {
  RoutineEntry,
  getExerciseName
} from "../../../domain/routineJournal";
import { styles } from "../../weightLog/weightLog.styles";

type RoutineHistoryItemProps = {
  entry: RoutineEntry;
  onDelete: (id: string) => void;
};

export function RoutineHistoryItem({ entry, onDelete }: RoutineHistoryItemProps) {
  function confirmDelete() {
    Alert.alert("Delete routine?", `${getExerciseName(entry.exerciseId)} will be removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(entry.id)
      }
    ]);
  }

  return (
    <View style={styles.historyItem}>
      <View style={styles.historyTextBlock}>
        <Text style={styles.historyDate}>{entry.date}</Text>
        <Text style={styles.historyMeta}>{getExerciseName(entry.exerciseId)}</Text>
      </View>
      <View style={styles.historyActions}>
        <Text style={styles.historyWeight}>
          {entry.sets} x {entry.reps}
        </Text>
        <Text style={styles.historyMeta}>
          {entry.weight.toFixed(1)} {entry.unit}
        </Text>
        <View style={styles.actionRow}>
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
