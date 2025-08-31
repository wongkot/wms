import { InventoryStatus } from "@app/modules/inventory/enums/inventory-status";

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
}