import { computed, inject, Injectable, signal } from '@angular/core';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { WarehouseMapState } from '@app/modules/inventory/models/warehouse-map-state';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { MockInventoryService } from '@app/modules/inventory/services/data/mock-inventory-service';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { finalize } from 'rxjs';

@Injectable()
export class InventoryDetailStateService {
  private _isFetchingData = signal<boolean>(false);
  private _errorMessage = signal<string>('');
  private _inventoryProduct = signal<InventoryProduct | null>(null);
  private _currentSortState = signal<TableSortState>({ columnProp: '', isAsc: true });
  private _selectedInventory = signal<Inventory | null>(null);
  private _selectedArea = signal<Set<string>>(new Set<string>());
  private _inventoryService: InventoryService = inject(MockInventoryService);
  warehouseMapState = computed(() => {
    const map = new Map<string, WarehouseMapState>();
    const groupedInventory = new Map<string, Inventory[]>();

    // Group inventory by area
    for (let inventory of this._inventoryProduct()?.inventories ?? []) {
      if (groupedInventory.has(inventory.area)) {
        const warehouseState = groupedInventory.get(inventory.area);
        warehouseState?.push(inventory);
      } else {
        groupedInventory.set(inventory.area, [ inventory ]);
      }
    }
    groupedInventory.forEach((inventories, area) => {
      const totalInventoryQuantity = inventories.reduce((total, current) => {
        return total + current.quantity;
      }, 0);
      map.set(area, {
        totalQuantity: totalInventoryQuantity,
        inventories: inventories
      })
    });

    return map;
  });

  get isFetchingData() {
    return this._isFetchingData.asReadonly();
  }

  get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  get inventoryProduct() {
    return this._inventoryProduct.asReadonly();
  }

  public get currentSortState() {
    return this._currentSortState.asReadonly();
  }

  public get selectedInventory() {
    return this._selectedInventory.asReadonly();
  }

  public get selectedArea() {
    return this._selectedArea.asReadonly();
  }

  loadInventories(productId: number): void {
    this._isFetchingData.set(true);
    this._inventoryService.getInventoryProductById(productId).pipe(
      finalize(() => this._isFetchingData.set(false))
    )
    .subscribe({
      next: (inventoryProduct) => {
        if (inventoryProduct) {
          this._inventoryProduct.set(inventoryProduct);
        } else {
          this._errorMessage.set(`Unable to find inventories with product id (${productId})`);
        }
      }
    });
  }

  sortInventories(sort: TableSortState) {
    if (!sort.columnProp) {
      sort = { columnProp: 'id', isAsc: true };
    }

    let sortedInventories = [ ...this._inventoryProduct()?.inventories ?? [] ];
    let firstItem = Object(sortedInventories.at(0));
    let columnType = firstItem ? typeof(firstItem[sort.columnProp]) : 'string';
    if (columnType == 'number') {
      sortedInventories = sortedInventories.sort((i1, i2) => Object(i1)[sort.columnProp] - Object(i2)[sort.columnProp]);
      sortedInventories = sort.isAsc ? sortedInventories : sortedInventories.reverse();
    } else {
      sortedInventories = sortedInventories.sort((i1, i2) => {
        let value1 = String(Object(i1)[sort.columnProp] ?? '');
        let value2 = String(Object(i2)[sort.columnProp] ?? '');
        return value1.toLocaleLowerCase().localeCompare(value2.toLocaleLowerCase());
      });
      sortedInventories = sort.isAsc ? sortedInventories : sortedInventories.reverse();
    }

    this._currentSortState.set(sort);
    this._inventoryProduct.set({
      ...this.inventoryProduct()!,
      inventories: sortedInventories,
    });
  }

  selectInventory(inventory: Inventory | null) {
    this._selectedInventory.set(inventory);
    this._selectedArea.set(new Set<string>(inventory ? [ inventory.area ] : []));
  }
}
