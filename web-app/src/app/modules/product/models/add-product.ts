export interface AddProduct {
  name: string;
  description?: string;
  category?: string;
  reorderThreshold?: number;
  unitPrice: number;
  imageUrl?: string;
}