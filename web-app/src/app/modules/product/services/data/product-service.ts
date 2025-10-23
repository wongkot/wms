import { Pagination } from "@app/core/models/pagination";
import { AddProduct } from "@app/modules/product/models/add-product";
import { EditProduct } from "@app/modules/product/models/edit-product";
import { Product } from "@app/modules/product/models/product";
import { Observable } from "rxjs";

export interface ProductService {
  hasProductName(name: string): Observable<boolean>;
  hasProductNameFromOtherId(name: string, id: number): Observable<boolean>;
  getProducts(): Observable<Product[]>;
  getProductNames(query: string, limit: number): Observable<string[]>;
  getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<Product>>;
  getProductById(id: number): Observable<Product | null>;
  addProduct(input: AddProduct): Observable<Product>;
  updateProduct(input: EditProduct): Observable<Product>;
  deleteProduct(id: number): Observable<Product | null>;
}