import { Inventory } from "@app/modules/inventory/models/inventory";

export interface InventoryProductDb {
  productId: number;
  quantity: number;
  inventories: Inventory[];
}