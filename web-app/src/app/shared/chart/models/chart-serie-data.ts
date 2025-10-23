export interface ChartSerieData {
  name: string;
  values: [any, any][]; // (x, y) value
  color: string;
  dataLabelColor: string;
}