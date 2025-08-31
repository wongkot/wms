import { Pagination } from "@app/core/models/pagination";
import { InventoryProduct } from "@app/modules/inventory/models/inventory-product";
import { Observable } from "rxjs";

export interface InventoryService {
  getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>>;
}