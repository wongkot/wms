import { InventoryOperation } from "@app/modules/inventory/models/inventory-operation";

export interface InventoryMoveAreaOperation extends InventoryOperation {
  newArea: string;
}