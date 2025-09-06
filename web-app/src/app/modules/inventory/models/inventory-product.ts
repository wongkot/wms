import { InventoryStatus } from "@app/modules/inventory/enums/inventory-status";
import { Inventory } from "@app/modules/inventory/models/inventory";

export interface InventoryProduct {
  productId: number;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  inventoryStatus: InventoryStatus;
  inventoryStatusName: string;
  reorderThreshold?: number;
  imageUrl?: string;
  inventories: Inventory[];
}