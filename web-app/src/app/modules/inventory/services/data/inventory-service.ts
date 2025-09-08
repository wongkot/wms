import { Pagination } from "@app/core/models/pagination";
import { Inventory } from "@app/modules/inventory/models/inventory";
import { InventoryMoveAreaOperation } from "@app/modules/inventory/models/inventory-move-area-operation";
import { InventoryOperation } from "@app/modules/inventory/models/inventory-operation";
import { InventoryProduct } from "@app/modules/inventory/models/inventory-product";
import { Observable } from "rxjs";

export interface InventoryService {
  getInventoryProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<InventoryProduct>>;
  getInventoryProductById(productId: number, sort: string): Observable<InventoryProduct | null>;
  inventoryInbound(input: InventoryOperation): Observable<Inventory>;
  inventoryOutbound(input: InventoryOperation): Observable<Inventory>;
  inventoryAdjustment(input: InventoryOperation): Observable<Inventory>;
  inventoryMoveArea(input: InventoryMoveAreaOperation): Observable<Inventory>;
}