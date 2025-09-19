import { InventoryHistoryDb } from "@app/modules/inventory-history/models/inventory-history-db";

export interface InventoryHistory extends InventoryHistoryDb {
  operationName: string;
}