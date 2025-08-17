export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  reorderThreshold?: number;
  unitPrice: number;
  imageUrl?: string;
  supplier?: string;
  tags: string[];
  defaultLocation?: string;
}