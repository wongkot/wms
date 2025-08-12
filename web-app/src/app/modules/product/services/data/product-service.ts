import { Product } from "@app/modules/product/models/product";
import { Observable } from "rxjs";

export interface ProductService {
  getProducts(): Observable<Product[]>;
}