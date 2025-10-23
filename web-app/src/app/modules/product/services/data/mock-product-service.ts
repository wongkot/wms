import { inject, Injectable } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InMemoryDbService } from '@app/core/services/data/in-memory-db-service';
import { AddProduct } from '@app/modules/product/models/add-product';
import { EditProduct } from '@app/modules/product/models/edit-product';
import { Product } from '@app/modules/product/models/product';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockProductService implements ProductService {
  private readonly _inMemoryDbService = inject(InMemoryDbService);

  public hasProductName(name: string): Observable<boolean> {
    return of(this._inMemoryDbService.hasProductName(name));
  }

  public hasProductNameFromOtherId(name: string, id: number): Observable<boolean> {
    return of(this._inMemoryDbService.hasProductNameFromOtherId(name, id));
  }

  public getProducts(): Observable<Product[]> {
    let products = this._inMemoryDbService.getProducts();
    return of(products);
  }

  public getProductNames(query: string, limit: number): Observable<string[]> {
    return of(this._inMemoryDbService.getProductNames(query, limit));
  }

  public getPageProducts(page: number, pageSize: number, query: string, category: string, sort: string): Observable<Pagination<Product>> {
    let pageProducts = this._inMemoryDbService.getPageProducts(page, pageSize, query, category, sort);
    return of(pageProducts);
  }

  public getProductById(id: number): Observable<Product | null> {
    return of(this._inMemoryDbService.getProductById(id));
  }

  public addProduct(input: AddProduct): Observable<Product> {
    let result = this._inMemoryDbService.addProduct(input);
    return of(result).pipe(
      delay(1000),
    );
  }

  public updateProduct(input: EditProduct): Observable<Product> {
    try {
      let result = this._inMemoryDbService.editProduct(input);
      return of(result).pipe(
        delay(1000),
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  public deleteProduct(id: number): Observable<Product | null> {
    return of(this._inMemoryDbService.deleteProduct(id));
  }
}
