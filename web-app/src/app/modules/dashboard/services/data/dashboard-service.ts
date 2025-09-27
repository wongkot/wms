import { InventoryDashboardApiOutput } from "@app/modules/dashboard/models/inventory-dashboard-api-output";
import { Observable } from "rxjs";

export interface DashboardService {
  getDashboardData(): Observable<InventoryDashboardApiOutput>;
}