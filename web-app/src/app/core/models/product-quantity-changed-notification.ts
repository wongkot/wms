export interface ProductQuantityChangedNotification {
  productName: string;
  quantityBefore: number;
  quantityAfter: number;
  read: boolean;
  timestamp: Date;
}