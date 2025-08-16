import { Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { Product } from '@app/modules/product/models/product';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockProductService implements ProductService {
  constructor(
    private _inMemoryDbService: InMemoryDbService
  ) { }

  getProducts(): Observable<Product[]> {
    let products = this._inMemoryDbService.getProducts();
    return of(products);
  }

  getPageProducts(page: number, pageSize: number, query: string, category: string): Observable<Pagination<Product>> {
    let pageProducts = this._inMemoryDbService.getPageProducts(page, pageSize, query, category);
    return of(pageProducts);
  }
}
