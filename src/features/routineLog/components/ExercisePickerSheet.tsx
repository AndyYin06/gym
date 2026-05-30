import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

import { Exercise } from "../../../domain/routineJournal";
import { styles } from "../../weightLog/weightLog.styles";

type ExercisePickerSheetProps = {
  exercises: Exercise[];
  visible: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
};

export function ExercisePickerSheet({
  exercises,
  visible,
  onClose,
  onSelect
}: ExercisePickerSheetProps) {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(360)).current;
  const isClosing = useRef(false);

  useEffect(() => {
    if (!visible) {
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(360);
      isClosing.current = false;
      return;
    }

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0.38,
        duration: 220,
        useNativeDriver: true
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true
      })
    ]).start();
  }, [backdropOpacity, sheetTranslateY, visible]);

  function closeSheet(afterClose?: () => void) {
    if (isClosing.current) {
      return;
    }

    isClosing.current = true;

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 360,
        duration: 220,
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (!finished) {
        return;
      }

      isClosing.current = false;
      if (afterClose) {
        afterClose();
      } else {
        onClose();
      }
    });
  }

  function selectExercise(exercise: Exercise) {
    closeSheet(() => onSelect(exercise));
  }

  return (
    <Modal
      animationType="none"
      onRequestClose={() => closeSheet()}
      transparent
      visible={visible}
    >
      <View style={styles.sheetRoot}>
        <Animated.View style={[styles.sheetBackdrop, { opacity: backdropOpacity }]}>
          <Pressable
            accessibilityLabel="Close exercise picker"
            onPress={() => closeSheet()}
            style={styles.sheetBackdropPressable}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY: sheetTranslateY }]
            }
          ]}
        >
          <View style={styles.sheetHandle} />
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Choose Exercise</Text>
            <Pressable style={styles.textButton} onPress={() => closeSheet()}>
              <Text style={styles.textButtonLabel}>Close</Text>
            </Pressable>
          </View>

          <View style={styles.exerciseList}>
            {exercises.map((exercise) => (
              <Pressable
                accessibilityRole="button"
                key={exercise.id}
                onPress={() => selectExercise(exercise)}
                style={styles.exerciseOption}
              >
                <Text style={styles.exerciseOptionLabel}>{exercise.name}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
