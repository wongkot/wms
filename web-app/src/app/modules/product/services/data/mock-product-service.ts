import { Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { AddProduct } from '@app/modules/product/models/add-product';
import { Product } from '@app/modules/product/models/product';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockProductService implements ProductService {
  constructor(
    private _inMemoryDbService: InMemoryDbService
  ) { }

  hasProductName(name: string): Observable<boolean> {
    return of(this._inMemoryDbService.hasProductName(name));
  }

  getProducts(): Observable<Product[]> {
    let products = this._inMemoryDbService.getProducts();
    return of(products);
  }

  getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<Product>> {
    let pageProducts = this._inMemoryDbService.getPageProducts(page, pageSize, query, category, sort);
    return of(pageProducts);
  }

  addProduct(input: AddProduct): Observable<Product> {
    let result = this._inMemoryDbService.addProduct(input);
    return of(result).pipe(
      delay(1000),
    );
  }
}
