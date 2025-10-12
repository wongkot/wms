import { formatDate } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { DATE_FORMAT } from '@app/core/constants/app';
import { Pagination } from '@app/core/models/pagination';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { InventoryHistoryService } from '@app/modules/inventory-history/services/data/inventory-history-service';
import { MockInventoryHistoryService } from '@app/modules/inventory-history/services/data/mock-inventory-history-service';
import { DateRange } from '@app/shared/date-picker/models/date-range';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { finalize } from 'rxjs';

@Injectable()
export class InventoryHistoryStateService {
  private _isLoading = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _selectedPageSize = signal<number>(20);
  private _selectedPage = signal<number>(1);
  private _searchTerm = signal<string>('');
  private _selectedOperationType = signal<number | null>(null);
  private _currentSortState = signal<TableSortState>({ columnProp: 'timestamp', isAsc: false });
  private _selectedDateRange = signal<DateRange>(this.createInitialDateRange());
  private _displayInventoryHistories = signal<Pagination<InventoryHistory>>({
    currentPage: this._selectedPage(),
    pageSize: this._selectedPageSize(),
    totalItems: 0,
    items: [],
  });
  private _inventoryHistoryService: InventoryHistoryService = inject(MockInventoryHistoryService);

  constructor() {
    this.loadInventoryHistories()
  }

  public get displayInventoryHistories() {
    return this._displayInventoryHistories.asReadonly();
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

  public get selectedOperationType() {
    return this._selectedOperationType.asReadonly();
  }

  public get selectedDateRange() {
    return this._selectedDateRange.asReadonly();
  }

  public get currentSortState() {
    return this._currentSortState.asReadonly();
  }

  loadInventoryHistories(options?: { page?: number, pageSize?: number, query?: string, operationType?: number | null, dateRange?: DateRange, sort?: TableSortState }): void {
    this._isLoading.set(true);
    this._errorMessage.set('');

    let page = options?.page != undefined ? options.page : this._selectedPage();
    let pageSize = options?.pageSize != undefined ? options.pageSize : this._selectedPageSize();
    let query = options?.query != undefined ? options.query : this._searchTerm();
    let operationType = options?.operationType !== undefined ? options.operationType : this._selectedOperationType();
    let sort = options?.sort != undefined ? options.sort : this._currentSortState();
    let dateRange = options?.dateRange != undefined ? options.dateRange : this._selectedDateRange();

    this._inventoryHistoryService.getInventoryHistories(page, pageSize, query, operationType, dateRange.startDate, dateRange.endDate, `${sort?.columnProp}:${sort?.isAsc ? 'asc' : 'desc'}`).pipe(
      finalize(() => { this._isLoading.set(false); }),
    ).subscribe({
      next: (pageInventoryHistories) => {
        this._displayInventoryHistories.set(pageInventoryHistories);
        this._isLoading.set(false);

        this._currentSortState.set(sort);
        this._selectedDateRange.set(dateRange);
        if (this._searchTerm() != query) this._searchTerm.set(query);
        if (this._selectedOperationType() != operationType) this._selectedOperationType.set(operationType);
        if (this._selectedPage() != pageInventoryHistories.currentPage) this._selectedPage.set(pageInventoryHistories.currentPage);
        if (this._selectedPageSize() != pageInventoryHistories.pageSize) this._selectedPageSize.set(pageInventoryHistories.pageSize);
      }
    });
  }

  private createInitialDateRange(): DateRange {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 2);

    return {
      startDate: formatDate(startDate, DATE_FORMAT, 'en-US'),
      endDate: formatDate(endDate, DATE_FORMAT, 'en-US'),
    };
  }
}
