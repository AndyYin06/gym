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
  contentWithFab: {
    padding: 20,
    paddingBottom: 104,
    gap: 20
  },
  screenWithFab: {
    flex: 1
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
  readOnlyField: {
    minHeight: 48,
    justifyContent: "center",
    borderColor: "#d8ddd4",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    backgroundColor: "#f2f4ed"
  },
  readOnlyFieldText: {
    color: "#4f5a53",
    fontSize: 17,
    fontWeight: "600"
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
  chartSubtitle: {
    color: "#6d756f",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2
  },
  chartMetric: {
    alignItems: "flex-end"
  },
  chartMetricValue: {
    color: "#17211b",
    fontSize: 18,
    fontWeight: "800"
  },
  chartMetricLabel: {
    color: "#6d756f",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2
  },
  chartScrollContent: {
    paddingTop: 2
  },
  chartCanvas: {
    position: "relative",
    overflow: "hidden"
  },
  chartGridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#e5e8e0"
  },
  chartGridLineTop: {
    top: 18
  },
  chartGridLineMiddle: {
    top: 76
  },
  chartGridLineBottom: {
    top: 134
  },
  chartLineSegment: {
    position: "absolute",
    height: 3,
    borderRadius: 999,
    backgroundColor: "#2f6f73"
  },
  chartDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2f6f73",
    borderColor: "#ffffff",
    borderWidth: 2
  },
  chartPointValue: {
    position: "absolute",
    width: 52,
    color: "#17211b",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center"
  },
  chartDateLabel: {
    position: "absolute",
    width: 48,
    color: "#6d756f",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center"
  },
  chartSummaryText: {
    color: "#4f5a53",
    fontSize: 13,
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
  historyTextBlock: {
    flex: 1
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
  },
  floatingAddButton: {
    position: "absolute",
    right: 20,
    bottom: 22,
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: "#2f6f73",
    shadowColor: "#17211b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6
  },
  floatingAddButtonLabel: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "500",
    lineHeight: 36,
    marginTop: -2
  },
  routineNumberRow: {
    flexDirection: "row",
    gap: 10
  },
  routineNumberField: {
    flex: 1
  },
  sheetRoot: {
    flex: 1,
    justifyContent: "flex-end"
  },
  sheetBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#17211b"
  },
  sheetBackdropPressable: {
    flex: 1
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 18,
    paddingBottom: 28,
    gap: 14
  },
  sheetHandle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cfd5cf"
  },
  exerciseList: {
    gap: 10
  },
  exerciseOption: {
    minHeight: 54,
    justifyContent: "center",
    borderColor: "#d8ddd4",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fbfcf8",
    paddingHorizontal: 14
  },
  exerciseOptionLabel: {
    color: "#17211b",
    fontSize: 17,
    fontWeight: "700"
  }
});
