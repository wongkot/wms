export interface EditProduct {
  id: number;
  name: string;
  description?: string;
  category?: string;
  reorderThreshold?: number;
  unitPrice: number;
  imageUrl?: string;
}