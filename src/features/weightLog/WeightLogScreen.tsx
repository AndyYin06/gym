import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { WeightEntryForm } from "./components/WeightEntryForm";
import { WeightHistory } from "./components/WeightHistory";
import { WeightLogHeader } from "./components/WeightLogHeader";
import { WeightTrendChart } from "./components/WeightTrendChart";
import { styles } from "./weightLog.styles";
import { useWeightLog } from "./useWeightLog";

const safeAreaEdges = ["top", "right", "left"] as const;

export function WeightLogScreen() {
  const weightLog = useWeightLog();

  if (weightLog.isLoading || !weightLog.journal) {
    return (
      <SafeAreaView edges={safeAreaEdges} style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator color="#2f6f73" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={safeAreaEdges} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <WeightLogHeader
            today={weightLog.today}
            unit={weightLog.unit}
            onUnitChange={weightLog.setUnitPreference}
          />

          <WeightEntryForm
            date={weightLog.date}
            editingEntry={weightLog.editingEntry}
            error={weightLog.error}
            existingEntry={weightLog.existingEntry}
            message={weightLog.message}
            onDateChange={weightLog.setDate}
            onReset={weightLog.resetForm}
            onSave={weightLog.saveEntry}
            onUnitChange={weightLog.setUnit}
            onWeightChange={weightLog.setWeight}
            unit={weightLog.unit}
            weight={weightLog.weight}
          />

          <WeightTrendChart
            entries={weightLog.journal.entries}
            unitPreference={weightLog.journal.unitPreference}
          />

          <WeightHistory
            entries={weightLog.journal.entries}
            onDelete={weightLog.deleteEntryByDate}
            onEdit={weightLog.startEditing}
            unitPreference={weightLog.journal.unitPreference}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
