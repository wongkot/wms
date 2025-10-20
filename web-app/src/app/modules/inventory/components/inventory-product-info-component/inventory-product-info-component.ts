import { Component, computed, inject, input, output } from '@angular/core';
import { INVENTORY_OPERATION_ADJUSTMENT, INVENTORY_OPERATION_INBOUND, INVENTORY_OPERATION_MOVE_AREA, INVENTORY_OPERATION_OUTBOUND } from '@app/core/constants/app';
import { InventoryStatus } from '@app/modules/inventory/enums/inventory-status';
import { Inventory } from '@app/modules/inventory/models/inventory';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryDetailStateService } from '@app/modules/inventory/services/state/inventory-detail-state-service';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';

@Component({
  selector: 'app-inventory-product-info',
  standalone: false,
  templateUrl: './inventory-product-info-component.html',
  styleUrl: './inventory-product-info-component.css'
})
export class InventoryProductInfoComponent {
  public readonly stateService = inject(InventoryDetailStateService);
  public readonly inventoryProductInfo = input<InventoryProduct | null>(null);
  public readonly inventoryStatusClasses = computed(() => {
    const classList = ['badge', 'badge-soft', 'my-2'];
    switch (this.inventoryProductInfo()?.inventoryStatus) {
      case InventoryStatus.Low:
        classList.push('badge-warning');
        break;
      case InventoryStatus.OutOfStock:
        classList.push('badge-error');
        break;
      default:
        classList.push('badge-success');
        break;
    }

    return classList.join(' ');
  });
  public readonly tableConfig: TableConfig = {
    canSelect: true,
    selectedProperty: 'id',
    columns: [
      {
        headerName: 'Area',
        dataProperty: 'area',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
        sortable: true,
      },
      {
        headerName: 'Lot',
        dataProperty: 'lot',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
        sortable: true,
      },
      {
        headerName: 'Quantity',
        dataProperty: 'quantity',
        highlighted: false,
        noWrap: true,
        columnType: 'number',
        sortable: true,
      },
    ],
  };

  public onSortChanged(newSort: TableSortState): void {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
      newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.sortInventories(newSort);
  }

  public onSelectInventory(row: Inventory): void {
    if (row.id === this.stateService.selectedInventory()?.id) {
      // Deselect if the same row is clicked
      this.stateService.selectInventory(null);
    } else {
      this.stateService.selectInventory(row);
    }
  }

  public onInboundClick(): void {
    this.stateService.selectInventoryOperation(INVENTORY_OPERATION_INBOUND);
    this.stateService.openDrawer();
  }

  public onOutboundClick(): void {
    this.stateService.selectInventoryOperation(INVENTORY_OPERATION_OUTBOUND);
    this.stateService.openDrawer();
  }

  public onInventoryAdjustmentClick(): void {
    this.stateService.selectInventoryOperation(INVENTORY_OPERATION_ADJUSTMENT);
    this.stateService.openDrawer();
  }

  public onMoveAreaClick(): void {
    this.stateService.selectInventoryOperation(INVENTORY_OPERATION_MOVE_AREA);
    this.stateService.openDrawer();
  }
}
