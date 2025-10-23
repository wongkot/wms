import { Inventory } from "@app/modules/inventory/models/inventory";

export interface WarehouseMapState {
  totalQuantity: number;
  inventories: Inventory[];
}