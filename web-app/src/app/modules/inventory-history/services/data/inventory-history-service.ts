import { Pagination } from "@app/core/models/pagination";
import { InventoryHistory } from "@app/modules/inventory-history/models/inventory-history";
import { Observable } from "rxjs";

export interface InventoryHistoryService {
  getInventoryHistories(page: number, pageSize: number, query: string, operationType: number | null, sort: string): Observable<Pagination<InventoryHistory>>;
}