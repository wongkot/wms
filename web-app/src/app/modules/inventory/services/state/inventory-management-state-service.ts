import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '@app/core/models/pagination';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { MockInventoryService } from '@app/modules/inventory/services/data/mock-inventory-service';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { finalize } from 'rxjs';

@Injectable()
export class InventoryManagementStateService {
  private readonly _isLoading = signal<boolean>(false);
  private readonly _errorMessage = signal<string>('');
  private readonly _selectedPageSize = signal<number>(10);
  private readonly _selectedPage = signal<number>(1);
  private readonly _searchTerm = signal<string>('');
  private readonly _selectedCategory = signal<string>('');
  private readonly _currentSortState = signal<TableSortState>({ columnProp: '', isAsc: true });
  private readonly _displayInventoryProducts = signal<Pagination<InventoryProduct>>({
    currentPage: this._selectedPage(),
    pageSize: this._selectedPageSize(),
    totalItems: 0,
    items: [],
  });
  private readonly _inventoryService: InventoryService = inject(MockInventoryService);

  constructor() {
    this.loadInventoryProducts()
  }

  public get displayInventoryProducts() {
    return this._displayInventoryProducts.asReadonly();
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

  public loadInventoryProducts(options?: { page?: number, pageSize?: number, query?: string, category?: string, sort?: TableSortState }): void {
    this._isLoading.set(true);
    this._errorMessage.set('');

    let page = options?.page != undefined ? options.page : this._selectedPage();
    let pageSize = options?.pageSize != undefined ? options.pageSize : this._selectedPageSize();
    let query = options?.query != undefined ? options.query : this._searchTerm();
    let category = options?.category != undefined ? options.category : this._selectedCategory();
    let sort = options?.sort != undefined ? options.sort : this._currentSortState();

    this._inventoryService.getInventoryProducts(page, pageSize, query, category, `${sort?.columnProp}:${sort?.isAsc ? 'asc' : 'desc'}`).pipe(
      finalize(() => { this._isLoading.set(false); }),
    ).subscribe({
      next: (pageInventoryProducts) => {
        this._displayInventoryProducts.set(pageInventoryProducts);
        this._isLoading.set(false);

        this._currentSortState.set(sort);
        if (this._searchTerm() != query) this._searchTerm.set(query);
        if (this._selectedCategory() != category) this._selectedCategory.set(category);
        if (this._selectedPage() != pageInventoryProducts.currentPage) this._selectedPage.set(pageInventoryProducts.currentPage);
        if (this._selectedPageSize() != pageInventoryProducts.pageSize) this._selectedPageSize.set(pageInventoryProducts.pageSize);
      }
    });
  }
}
