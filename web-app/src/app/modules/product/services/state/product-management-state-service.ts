import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { Product } from '@app/modules/product/models/product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { finalize } from 'rxjs';

@Injectable()
export class ProductManagementStateService {
  private _isLoading = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _selectedPageSize = signal<number>(10);
  private _selectedPage = signal<number>(1);
  private _searchTerm = signal<string>('');
  private _displayProducts = signal<Pagination<Product>>({
    currentPage: this._selectedPage(),
    pageSize: this._selectedPageSize(),
    totalItems: 0,
    items: [],
  });

  private _productService: ProductService;

  constructor() {
    this._productService = inject(MockProductService);
    this.loadProducts(this._selectedPage(), this._selectedPageSize(), this._searchTerm());
  }

  public get displayProducts() {
    return this._displayProducts.asReadonly();
  }

  public get selectedPage() {
    return this._selectedPage.asReadonly();
  }

  public get selectedPageSize() {
    return this._selectedPageSize.asReadonly();
  }

  public get searchTerm() {
    return this._searchTerm.asReadonly();
  }

  /**
   * Load products for display
   */
  loadProducts(page: number, pageSize: number, query: string): void {
    this._isLoading.set(true);
    this._errorMessage.set('');

    this._productService.getPageProducts(page, pageSize, query).pipe(
      finalize(() => { this._isLoading.set(false); }),
    ).subscribe({
      next: (pageProducts: Pagination<Product>) => {
        this._displayProducts.set(pageProducts);
        this._isLoading.set(false);
        this._searchTerm.set(query);

        if (this._selectedPage() != pageProducts.currentPage) this._selectedPage.set(pageProducts.currentPage);
        if (this._selectedPageSize() != pageProducts.pageSize) this._selectedPageSize.set(pageProducts.pageSize);
      },
      error: () => {
        this._isLoading.set(false);
      }
    });
  }
}
