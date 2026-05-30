import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../weightLog/weightLog.styles";
import { ExercisePickerSheet } from "./components/ExercisePickerSheet";
import { RoutineEntryForm } from "./components/RoutineEntryForm";
import { RoutineHistory } from "./components/RoutineHistory";
import { useRoutineLog } from "./useRoutineLog";

const safeAreaEdges = ["top", "right", "left"] as const;

export function RoutineLogScreen() {
  const routineLog = useRoutineLog();

  if (routineLog.isLoading || !routineLog.journal) {
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
        <View style={styles.screenWithFab}>
          <ScrollView contentContainerStyle={styles.contentWithFab}>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>Routine Log</Text>
                <Text style={styles.title}>Workout Routine</Text>
              </View>
            </View>

            {routineLog.isFormVisible ? (
              <RoutineEntryForm
                date={routineLog.date}
                error={routineLog.error}
                message={routineLog.message}
                onDateChange={routineLog.setDate}
                onReset={routineLog.resetForm}
                onRepsChange={routineLog.setReps}
                onSave={routineLog.saveEntry}
                onSetsChange={routineLog.setSets}
                onUnitChange={routineLog.setUnit}
                onWeightChange={routineLog.setWeight}
                reps={routineLog.reps}
                selectedExercise={routineLog.selectedExercise}
                sets={routineLog.sets}
                unit={routineLog.unit}
                weight={routineLog.weight}
              />
            ) : null}

            <RoutineHistory
              entries={routineLog.journal.entries}
              onDelete={routineLog.deleteEntryById}
            />
          </ScrollView>

          <Pressable
            accessibilityLabel="Add routine entry"
            accessibilityRole="button"
            onPress={routineLog.openExerciseSheet}
            style={styles.floatingAddButton}
          >
            <Text style={styles.floatingAddButtonLabel}>+</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <ExercisePickerSheet
        exercises={routineLog.exercises}
        onClose={routineLog.closeExerciseSheet}
        onSelect={routineLog.selectExercise}
        visible={routineLog.isExerciseSheetVisible}
      />
    </SafeAreaView>
  );
}
