import { Pressable, Text, TextInput, View } from "react-native";

import { Exercise } from "../../../domain/routineJournal";
import { WeightUnit } from "../../../domain/weightJournal";
import { SegmentedControl } from "../../weightLog/components/SegmentedControl";
import { styles } from "../../weightLog/weightLog.styles";

type RoutineEntryFormProps = {
  selectedExercise: Exercise | null;
  date: string;
  sets: string;
  reps: string;
  weight: string;
  unit: WeightUnit;
  error: string;
  message: string;
  onDateChange: (date: string) => void;
  onSetsChange: (sets: string) => void;
  onRepsChange: (reps: string) => void;
  onWeightChange: (weight: string) => void;
  onUnitChange: (unit: WeightUnit) => void;
  onReset: () => void;
  onSave: () => void;
};

export function RoutineEntryForm({
  selectedExercise,
  date,
  sets,
  reps,
  weight,
  unit,
  error,
  message,
  onDateChange,
  onSetsChange,
  onRepsChange,
  onWeightChange,
  onUnitChange,
  onReset,
  onSave
}: RoutineEntryFormProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>
          {selectedExercise ? selectedExercise.name : "Log Exercise"}
        </Text>
        <Pressable style={styles.textButton} onPress={onReset}>
          <Text style={styles.textButtonLabel}>Cancel</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Date</Text>
      <TextInput
        autoCapitalize="none"
        inputMode="numeric"
        onChangeText={onDateChange}
        placeholder="YYYY-MM-DD"
        style={styles.input}
        value={date}
      />

      <View style={styles.routineNumberRow}>
        <View style={styles.routineNumberField}>
          <Text style={styles.label}>Sets</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="number-pad"
            onChangeText={onSetsChange}
            placeholder="3"
            style={styles.input}
            value={sets}
          />
        </View>
        <View style={styles.routineNumberField}>
          <Text style={styles.label}>Reps</Text>
          <TextInput
            inputMode="numeric"
            keyboardType="number-pad"
            onChangeText={onRepsChange}
            placeholder="5"
            style={styles.input}
            value={reps}
          />
        </View>
      </View>

      <Text style={styles.label}>Weight</Text>
      <View style={styles.weightRow}>
        <TextInput
          inputMode="decimal"
          keyboardType="decimal-pad"
          onChangeText={onWeightChange}
          placeholder="0.0"
          style={[styles.input, styles.weightInput]}
          value={weight}
        />
        <SegmentedControl value={unit} onChange={onUnitChange} compact />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {message ? <Text style={styles.successText}>{message}</Text> : null}

      <Pressable style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryButtonLabel}>Save Routine</Text>
      </Pressable>
    </View>
  );
}
