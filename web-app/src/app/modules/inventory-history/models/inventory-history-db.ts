export interface InventoryHistoryDb {
  id: number;
  timestamp: Date;
  operationType: number;
  productId: number;
  productName: string;
  lot: string;
  area: string;
  quantity: number;
  beforeQuantity: number;
  afterQuantity: number;
}