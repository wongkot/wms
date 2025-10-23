import { ChartSerieData } from "@app/shared/chart/models/chart-serie-data";

export interface BaseChartInput {
  chartHeight: number;
  chartTitle: string;
  chartSeries: ChartSerieData[];
}