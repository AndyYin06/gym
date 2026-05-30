import { Pressable, Text, TextInput, View } from "react-native";

import { WeightEntry, WeightUnit } from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";
import { SegmentedControl } from "./SegmentedControl";

type WeightEntryFormProps = {
  date: string;
  weight: string;
  unit: WeightUnit;
  editingEntry: WeightEntry | null;
  existingEntry?: WeightEntry;
  error: string;
  message: string;
  onDateChange: (date: string) => void;
  onWeightChange: (weight: string) => void;
  onUnitChange: (unit: WeightUnit) => void;
  onReset: () => void;
  onSave: () => void;
};

export function WeightEntryForm({
  date,
  weight,
  unit,
  editingEntry,
  existingEntry,
  error,
  message,
  onDateChange,
  onWeightChange,
  onUnitChange,
  onReset,
  onSave
}: WeightEntryFormProps) {
  const isDateLocked = Boolean(editingEntry || existingEntry);

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>
          {editingEntry ? "Edit Entry" : existingEntry ? "Update Entry" : "Log Weight"}
        </Text>
        <Pressable style={styles.textButton} onPress={onReset}>
          <Text style={styles.textButtonLabel}>Today</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Date</Text>
      {isDateLocked ? (
        <View style={styles.readOnlyField}>
          <Text style={styles.readOnlyFieldText}>{date}</Text>
        </View>
      ) : (
        <TextInput
          autoCapitalize="none"
          inputMode="numeric"
          onChangeText={onDateChange}
          placeholder="YYYY-MM-DD"
          style={styles.input}
          value={date}
        />
      )}

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
        <Text style={styles.primaryButtonLabel}>
          {existingEntry ? "Update Weight" : "Save Weight"}
        </Text>
      </Pressable>
    </View>
  );
}
