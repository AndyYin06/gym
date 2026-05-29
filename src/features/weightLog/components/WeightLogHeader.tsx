import { Text, View } from "react-native";

import { WeightUnit } from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";
import { SegmentedControl } from "./SegmentedControl";

type WeightLogHeaderProps = {
  today: string;
  unit: WeightUnit;
  onUnitChange: (unit: WeightUnit) => void;
};

export function WeightLogHeader({ today, unit, onUnitChange }: WeightLogHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{today}</Text>
        <Text style={styles.title}>Weight Log</Text>
      </View>
      <SegmentedControl value={unit} onChange={onUnitChange} />
    </View>
  );
}
