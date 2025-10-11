import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { Product } from '@app/modules/product/models/product';
import { MockProductService } from '@app/modules/product/services/data/mock-product-service';
import { ProductService } from '@app/modules/product/services/data/product-service';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { finalize, Subject } from 'rxjs';

@Injectable()
export class ProductManagementStateService {
  private _isLoading = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _selectedPageSize = signal<number>(10);
  private _selectedPage = signal<number>(1);
  private _searchTerm = signal<string>('');
  private _selectedCategory = signal<string>('');
  private _currentSortState = signal<TableSortState>({ columnProp: '', isAsc: true });
  private _displayProducts = signal<Pagination<Product>>({
    currentPage: this._selectedPage(),
    pageSize: this._selectedPageSize(),
    totalItems: 0,
    items: [],
  });
  private _productService: ProductService;
  private _deleteSuccess = new Subject<void>();
  public readonly deleteSuccess$ = this._deleteSuccess.asObservable();

  constructor() {
    this._productService = inject(MockProductService);
    this.loadProducts();
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

  public get selectedCategory() {
    return this._selectedCategory.asReadonly();
  }

  public get currentSortState() {
    return this._currentSortState.asReadonly();
  }

  /**
   * Load products for display
   */
  loadProducts(options?: { page?: number, pageSize?: number, query?: string, category?: string, sort?: TableSortState }): void {
    this._isLoading.set(true);
    this._errorMessage.set('');

    let page = options?.page != undefined ? options.page : this._selectedPage();
    let pageSize = options?.pageSize != undefined ? options.pageSize : this._selectedPageSize();
    let query = options?.query != undefined ? options.query : this._searchTerm();
    let category = options?.category !== undefined ? options.category : this._selectedCategory();
    let sort = options?.sort != undefined ? options.sort : this._currentSortState();

    this._productService.getPageProducts(page, pageSize, query, category, `${sort.columnProp}:${sort.isAsc ? 'asc' : 'desc'}`).pipe(
      finalize(() => { this._isLoading.set(false); }),
    ).subscribe({
      next: (pageProducts: Pagination<Product>) => {
        this._displayProducts.set(pageProducts);
        this._isLoading.set(false);

        this._currentSortState.set(sort);
        if (this._searchTerm() != query) this._searchTerm.set(query);
        if (this._selectedCategory() != category) this._selectedCategory.set(category);
        if (this._selectedPage() != pageProducts.currentPage) this._selectedPage.set(pageProducts.currentPage);
        if (this._selectedPageSize() != pageProducts.pageSize) this._selectedPageSize.set(pageProducts.pageSize);
      }
    });
  }

  deleteProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe({
      next: () => {
        this._deleteSuccess.next();
        this.loadProducts();
      }
    });
  }
}
