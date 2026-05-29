import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f2"
  },
  keyboardView: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    padding: 20,
    paddingBottom: 36,
    gap: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16
  },
  eyebrow: {
    color: "#6d756f",
    fontSize: 13,
    fontWeight: "600"
  },
  title: {
    color: "#17211b",
    fontSize: 30,
    fontWeight: "700"
  },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#e0e2da",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 10
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  panelTitle: {
    color: "#17211b",
    fontSize: 18,
    fontWeight: "700"
  },
  label: {
    color: "#4f5a53",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6
  },
  input: {
    minHeight: 48,
    borderColor: "#cfd5cf",
    borderRadius: 8,
    borderWidth: 1,
    color: "#17211b",
    fontSize: 17,
    paddingHorizontal: 12,
    backgroundColor: "#fbfcf8"
  },
  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  weightInput: {
    flex: 1
  },
  segmentedControl: {
    flexDirection: "row",
    borderColor: "#9eb4ad",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    minWidth: 112
  },
  segmentedControlCompact: {
    minWidth: 104
  },
  segment: {
    minHeight: 42,
    minWidth: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  segmentSelected: {
    backgroundColor: "#2f6f73"
  },
  segmentLabel: {
    color: "#2f6f73",
    fontSize: 15,
    fontWeight: "700"
  },
  segmentLabelSelected: {
    color: "#ffffff"
  },
  primaryButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f6f73",
    borderRadius: 8,
    marginTop: 8
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
  textButton: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  textButtonLabel: {
    color: "#2f6f73",
    fontSize: 15,
    fontWeight: "700"
  },
  errorText: {
    color: "#a33b2f",
    fontSize: 14,
    fontWeight: "600"
  },
  successText: {
    color: "#2f6f50",
    fontSize: 14,
    fontWeight: "600"
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: "#17211b",
    fontSize: 22,
    fontWeight: "700"
  },
  historyCount: {
    color: "#6d756f",
    fontSize: 14,
    fontWeight: "600"
  },
  emptyState: {
    borderColor: "#d8ddd4",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 18
  },
  emptyTitle: {
    color: "#17211b",
    fontSize: 16,
    fontWeight: "700"
  },
  emptyBody: {
    color: "#5f6962",
    fontSize: 14,
    marginTop: 4
  },
  historyList: {
    gap: 10
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "#ffffff",
    borderColor: "#e0e2da",
    borderRadius: 8,
    borderWidth: 1,
    padding: 14
  },
  historyDate: {
    color: "#17211b",
    fontSize: 16,
    fontWeight: "700"
  },
  historyMeta: {
    color: "#6d756f",
    fontSize: 12,
    marginTop: 4
  },
  historyActions: {
    alignItems: "flex-end",
    gap: 8
  },
  historyWeight: {
    color: "#17211b",
    fontSize: 18,
    fontWeight: "800"
  },
  actionRow: {
    flexDirection: "row",
    gap: 8
  },
  smallButton: {
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#b8c6c1",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  smallButtonLabel: {
    color: "#2f6f73",
    fontSize: 13,
    fontWeight: "700"
  },
  deleteButton: {
    borderColor: "#d8b7b1"
  },
  deleteButtonLabel: {
    color: "#a33b2f"
  }
});
