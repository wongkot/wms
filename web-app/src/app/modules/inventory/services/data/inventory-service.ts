import { Pagination } from "@app/core/models/pagination";
import { Inventory } from "@app/modules/inventory/models/inventory";
import { InventoryProduct } from "@app/modules/inventory/models/inventory-product";
import { Observable } from "rxjs";

export interface InventoryService {
  getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>>;
  getInventoryProductById(productId: number): Observable<InventoryProduct | null>;
}