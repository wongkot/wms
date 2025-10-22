import { computed, inject, Injectable, signal } from '@angular/core';
import { INVENTORY_OPERATION_ADJUSTMENT, INVENTORY_OPERATION_INBOUND, INVENTORY_OPERATION_MOVE_AREA, INVENTORY_OPERATION_OUTBOUND } from '@app/core/constants/app';
import { UtilityService } from '@app/core/services/data/utility-service';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryMoveAreaOperation } from '@app/modules/inventory/models/inventory-move-area-operation';
import { InventoryOperation } from '@app/modules/inventory/models/inventory-operation';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { WarehouseMapState } from '@app/modules/inventory/models/warehouse-map-state';
import { InventoryService } from '@app/modules/inventory/services/data/inventory-service';
import { MockInventoryService } from '@app/modules/inventory/services/data/mock-inventory-service';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { delay, finalize, Observable, Subject } from 'rxjs';

@Injectable()
export class InventoryDetailStateService {
  private readonly _isFetchingData = signal<boolean>(false);
  private readonly _errorMessage = signal<string>('');
  private readonly _isCallingInventoryOperationApi = signal<boolean>(false);
  private readonly _inventoryOperationErrorMessage = signal<string>('');
  private readonly _inventoryProduct = signal<InventoryProduct | null>(null);
  private readonly _currentSortState = signal<TableSortState>({ columnProp: '', isAsc: true });
  private readonly _selectedInventory = signal<Inventory | null>(null);
  private readonly _selectedArea = signal<Set<string>>(new Set<string>());
  private readonly _selectedInventoryOperation = signal<string>('');
  private readonly _utilityService = inject(UtilityService);
  private readonly _inventoryService: InventoryService = inject(MockInventoryService);
  private readonly _drawerOpened = signal<boolean>(false);
  private readonly _inventoryOperationSuccess = new Subject<void>();
  public readonly inventoryOperationSuccess$ = this._inventoryOperationSuccess.asObservable();
  public readonly warehouseMapState = computed(() => {
    const map = new Map<string, WarehouseMapState>();
    const groupedInventory = new Map<string, Inventory[]>();

    // Group inventory by area
    for (let inventory of this._inventoryProduct()?.inventories ?? []) {
      if (groupedInventory.has(inventory.area)) {
        const warehouseState = groupedInventory.get(inventory.area);
        warehouseState?.push(inventory);
      } else {
        groupedInventory.set(inventory.area, [inventory]);
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

  public get isFetchingData() {
    return this._isFetchingData.asReadonly();
  }

  public get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  public get inventoryProduct() {
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

  public get drawerOpened() {
    return this._drawerOpened.asReadonly();
  }

  public get selectedInventoryOperation() {
    return this._selectedInventoryOperation.asReadonly();
  }

  public get isCallingInventoryOperationApi() {
    return this._isCallingInventoryOperationApi.asReadonly();
  }

  public get inventoryOperationErrorMessage() {
    return this._inventoryOperationErrorMessage.asReadonly();
  }

  public loadInventories(productId: number, updatedInventory?: Inventory): void {
    this._isFetchingData.set(true);
    const sort = this._currentSortState().columnProp ? `${this._currentSortState().columnProp}:${this._currentSortState().isAsc ? 'asc' : 'desc'}` : '';
    this._inventoryService.getInventoryProductById(productId, sort).pipe(
      finalize(() => this._isFetchingData.set(false))
    )
      .subscribe({
        next: (inventoryProduct) => {
          if (inventoryProduct) {
            // Reset sort state
            if (inventoryProduct.inventories.length <= 0) {
              this._currentSortState.set({ columnProp: '', isAsc: true });
            }

            // Select current inventory and area if product inventories contains updated inventory from the operation
            const foundInventory = inventoryProduct.inventories.find(inventory => inventory.id == updatedInventory?.id);
            if (foundInventory) {
              this._selectedInventory.set(foundInventory);
              this._selectedArea.set(new Set<string>([foundInventory.area]));
            } else {
              this._selectedInventory.set(null);
              this._selectedArea.set(new Set<string>());
            }

            this._selectedInventoryOperation.set('');
            this._inventoryProduct.set(inventoryProduct);
          } else {
            this._errorMessage.set(`Unable to find inventories with product id (${productId})`);
          }
        }
      });
  }

  public sortInventories(sort: TableSortState): void {
    if (!sort.columnProp) {
      sort = { columnProp: 'id', isAsc: true };
    }

    let sortedInventories = [...this._inventoryProduct()?.inventories ?? []];
    sortedInventories = this._utilityService.sortArray(sortedInventories, sort.columnProp, sort.isAsc);

    this._currentSortState.set(sort);
    this._inventoryProduct.set({
      ...this.inventoryProduct()!,
      inventories: sortedInventories,
    });
  }

  public selectInventory(inventory: Inventory | null): void {
    this._selectedInventory.set(inventory);
    this._selectedArea.set(new Set<string>(inventory ? [inventory.area] : []));
  }

  public selectInventoryOperation(inventoryOperation: string): void {
    this._selectedInventoryOperation.set(inventoryOperation);
  }

  public openDrawer(): void {
    this._drawerOpened.set(true);
  }

  public closeDrawer(): void {
    this._drawerOpened.set(false);
  }

  public inventoryInbound(input: InventoryOperation): void {
    this.inventoryOperation(input, INVENTORY_OPERATION_INBOUND);
  }

  public inventoryOutbound(input: InventoryOperation): void {
    this.inventoryOperation(input, INVENTORY_OPERATION_OUTBOUND);
  }

  public inventoryAdjustment(input: InventoryOperation): void {
    this.inventoryOperation(input, INVENTORY_OPERATION_ADJUSTMENT);
  }

  public inventoryMoveArea(input: InventoryMoveAreaOperation): void {
    this.inventoryOperation(input, INVENTORY_OPERATION_MOVE_AREA);
  }

  public clearInventoryOperationError(): void {
    this._inventoryOperationErrorMessage.set('');
  }

  private inventoryOperation(input: InventoryOperation | InventoryMoveAreaOperation, type: string): void {
    let inventoryOperations: Observable<Inventory>;
    switch (type) {
      case INVENTORY_OPERATION_INBOUND:
        inventoryOperations = this._inventoryService.inventoryInbound(input);
        break;
      case INVENTORY_OPERATION_OUTBOUND:
        inventoryOperations = this._inventoryService.inventoryOutbound(input);
        break;
      case INVENTORY_OPERATION_ADJUSTMENT:
        inventoryOperations = this._inventoryService.inventoryAdjustment(input);
        break;
      case INVENTORY_OPERATION_MOVE_AREA:
        inventoryOperations = this._inventoryService.inventoryMoveArea(input as InventoryMoveAreaOperation);
        break;
      default:
        throw Error(`Inventory operation (${type}) not supported`);
    }

    this._isCallingInventoryOperationApi.set(true);
    this._inventoryOperationErrorMessage.set('');
    inventoryOperations.pipe(
      delay(500),
      finalize(() => this._isCallingInventoryOperationApi.set(false))
    ).subscribe({
      next: (inventory) => {
        this.closeDrawer();
        this._inventoryOperationSuccess.next();
        this.loadInventories(input.productId, inventory);
      },
      error: (error: Error) => {
        this._inventoryOperationErrorMessage.set(error.message);
      }
    });
  }
}
