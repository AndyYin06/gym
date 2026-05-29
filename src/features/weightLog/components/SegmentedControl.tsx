import { Pressable, Text, View } from "react-native";

import { WeightUnit } from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";

const unitOptions: WeightUnit[] = ["lb", "kg"];

type SegmentedControlProps = {
  value: WeightUnit;
  onChange: (unit: WeightUnit) => void;
  compact?: boolean;
};

export function SegmentedControl({
  value,
  onChange,
  compact = false
}: SegmentedControlProps) {
  return (
    <View style={[styles.segmentedControl, compact && styles.segmentedControlCompact]}>
      {unitOptions.map((option) => {
        const selected = option === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option}
            onPress={() => onChange(option)}
            style={[styles.segment, selected && styles.segmentSelected]}
          >
            <Text style={[styles.segmentLabel, selected && styles.segmentLabelSelected]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
