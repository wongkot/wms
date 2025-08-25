import { Pagination } from "@app/core/models/pagination";
import { AddProduct } from "@app/modules/product/models/add-product";
import { Product } from "@app/modules/product/models/product";
import { Observable } from "rxjs";

export interface ProductService {
  hasProductName(name: string): Observable<boolean>;
  getProducts(): Observable<Product[]>;
  getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<Product>>;
  addProduct(input: AddProduct): Observable<Product>;
}