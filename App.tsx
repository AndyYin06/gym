import { SafeAreaProvider } from "react-native-safe-area-context";

import { WeightLogScreen } from "./src/features/weightLog/WeightLogScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <WeightLogScreen />
    </SafeAreaProvider>
  );
}
