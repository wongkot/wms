import { InventoryDashboard } from "@app/modules/dashboard/models/inventory-dashboard";

export interface InventoryDashboardApiOutput extends InventoryDashboard {
  inboundBarChartSeries: [any, any][];
  outboundBarChartSeries: [any, any][];
  pieChartSeries: [any, any][];
}