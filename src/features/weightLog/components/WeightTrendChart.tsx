import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import {
  WeightEntry,
  WeightUnit,
  getWeightTrendPoints
} from "../../../domain/weightJournal";
import { styles } from "../weightLog.styles";

type WeightTrendChartProps = {
  entries: WeightEntry[];
  unitPreference: WeightUnit;
};

type ChartPoint = {
  date: string;
  label: string;
  value: number;
  x: number;
  y: number;
};

const chartHeight = 172;
const chartTopPadding = 18;
const chartBottomPadding = 38;
const chartHorizontalPadding = 22;
const minPointGap = 58;

export function WeightTrendChart({
  entries,
  unitPreference
}: WeightTrendChartProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const trendPoints = useMemo(
    () => getWeightTrendPoints(entries, unitPreference),
    [entries, unitPreference]
  );

  const chartWidth = Math.max(
    containerWidth,
    chartHorizontalPadding * 2 + Math.max(trendPoints.length - 1, 1) * minPointGap
  );

  const values = trendPoints.map((point) => point.displayWeight);
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const latestPoint = trendPoints[trendPoints.length - 1];
  const firstPoint = trendPoints[0];
  const change = latestPoint && firstPoint ? latestPoint.displayWeight - firstPoint.displayWeight : 0;
  const changeLabel =
    trendPoints.length < 2
      ? "Add another entry to see change"
      : `${change >= 0 ? "+" : ""}${change.toFixed(1)} ${unitPreference} since first`;

  const chartPoints = useMemo<ChartPoint[]>(() => {
    if (trendPoints.length === 0) {
      return [];
    }

    const plotHeight = chartHeight - chartTopPadding - chartBottomPadding;
    const valueRange = maxValue - minValue || 1;
    const usableWidth = Math.max(chartWidth - chartHorizontalPadding * 2, 1);

    return trendPoints.map((point, index) => {
      const x =
        trendPoints.length === 1
          ? chartWidth / 2
          : chartHorizontalPadding + (usableWidth * index) / (trendPoints.length - 1);
      const y =
        maxValue === minValue
          ? chartTopPadding + plotHeight / 2
          : chartTopPadding +
            ((maxValue - point.displayWeight) / valueRange) * plotHeight;

      return {
        date: point.date,
        label: point.date.slice(5),
        value: point.displayWeight,
        x,
        y
      };
    });
  }, [chartWidth, maxValue, minValue, trendPoints]);

  return (
    <View
      style={styles.panel}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.panelHeader}>
        <View>
          <Text style={styles.panelTitle}>Trend</Text>
          <Text style={styles.chartSubtitle}>{entries.length} entries over time</Text>
        </View>
        {latestPoint ? (
          <View style={styles.chartMetric}>
            <Text style={styles.chartMetricValue}>
              {latestPoint.displayWeight.toFixed(1)} {unitPreference}
            </Text>
            <Text style={styles.chartMetricLabel}>latest</Text>
          </View>
        ) : null}
      </View>

      {chartPoints.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No trend yet.</Text>
          <Text style={styles.emptyBody}>Log weights to visualize progress over time.</Text>
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            <View style={[styles.chartCanvas, { height: chartHeight, width: chartWidth }]}>
              <View style={[styles.chartGridLine, styles.chartGridLineTop]} />
              <View style={[styles.chartGridLine, styles.chartGridLineMiddle]} />
              <View style={[styles.chartGridLine, styles.chartGridLineBottom]} />

              {chartPoints.slice(0, -1).map((point, index) => {
                const nextPoint = chartPoints[index + 1];
                const dx = nextPoint.x - point.x;
                const dy = nextPoint.y - point.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                return (
                  <View
                    key={`${point.date}-${nextPoint.date}`}
                    style={[
                      styles.chartLineSegment,
                      {
                        left: point.x + dx / 2 - length / 2,
                        top: point.y + dy / 2 - 1.5,
                        transform: [{ rotateZ: `${angle}rad` }],
                        width: length
                      }
                    ]}
                  />
                );
              })}

              {chartPoints.map((point) => (
                <View key={point.date}>
                  <View
                    style={[
                      styles.chartDot,
                      {
                        left: point.x - 5,
                        top: point.y - 5
                      }
                    ]}
                  />
                  <Text
                    style={[
                      styles.chartPointValue,
                      {
                        left: point.x - 26,
                        top: Math.max(point.y - 30, 0)
                      }
                    ]}
                  >
                    {point.value.toFixed(1)}
                  </Text>
                  <Text
                    style={[
                      styles.chartDateLabel,
                      {
                        left: point.x - 24,
                        top: chartHeight - 24
                      }
                    ]}
                  >
                    {point.label}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text style={styles.chartSummaryText}>{changeLabel}</Text>
        </>
      )}
    </View>
  );
}
