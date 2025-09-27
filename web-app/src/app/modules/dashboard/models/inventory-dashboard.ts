export interface InventoryDashboard {
  currentMonthTotalInbound: number | null;
  currentMonthTotalOutbound: number | null;
  totalInboundPercent: number | null;
  totalOutboundPercent: number | null;
  totalLowInventory: number;
}