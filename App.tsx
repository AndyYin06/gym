import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { RoutineLogScreen } from "./src/features/routineLog/RoutineLogScreen";
import { WeightLogScreen } from "./src/features/weightLog/WeightLogScreen";

type AppTab = "weight" | "routine";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("weight");

  return (
    <SafeAreaProvider>
      <View style={appStyles.app}>
        <View style={appStyles.screen}>
          {activeTab === "weight" ? <WeightLogScreen /> : <RoutineLogScreen />}
        </View>
        <SafeAreaView edges={["bottom"]} style={appStyles.tabBar}>
          <TabButton
            active={activeTab === "weight"}
            label="Weight"
            onPress={() => setActiveTab("weight")}
          />
          <TabButton
            active={activeTab === "routine"}
            label="Routine"
            onPress={() => setActiveTab("routine")}
          />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

type TabButtonProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function TabButton({ active, label, onPress }: TabButtonProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[appStyles.tabButton, active && appStyles.tabButtonActive]}
    >
      <Text style={[appStyles.tabLabel, active && appStyles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const appStyles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#f7f7f2"
  },
  screen: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderTopColor: "#dfe4dc",
    borderTopWidth: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  tabButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d8ddd4",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fbfcf8"
  },
  tabButtonActive: {
    borderColor: "#2f6f73",
    backgroundColor: "#2f6f73"
  },
  tabLabel: {
    color: "#4f5a53",
    fontSize: 15,
    fontWeight: "700"
  },
  tabLabelActive: {
    color: "#ffffff"
  }
});
