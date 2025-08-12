import { inject, Injectable, signal } from '@angular/core';
import { Product } from '@app/modules/product/models/product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementStateService {
  private _displayProducts = signal<Product[]>([]);
  private _isLoading = signal<boolean>(false);
  private _errorMessage = signal<string>('');

  private _productService: ProductService;

  constructor() {
    this._productService = inject(MockProductService);
    this.loadProducts();
  }

  public get displayProducts() {
    return this._displayProducts.asReadonly();
  }

  /**
   * Load products for display
   */
  loadProducts(): void {
    this._isLoading.set(true);
    this._errorMessage.set('');

    this._productService.getProducts().pipe(
      finalize(() => { this._isLoading.set(false); }),
    ).subscribe({
      next: (products: Product[]) => {
        this._displayProducts.set(products);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      }
    });
  }
}
