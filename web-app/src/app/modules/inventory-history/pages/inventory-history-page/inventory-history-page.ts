import { KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DEFAULT_LOCALE } from '@app/core/constants/app';
import { InventoryOperationType } from '@app/modules/inventory-history/enums/inventory-operation-type';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { InventoryHistoryStateService } from '@app/modules/inventory-history/services/state/inventory-history-state-service';
import { DateRange } from '@app/shared/date-picker/models/date-range';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';

@Component({
  selector: 'app-inventory-history',
  standalone: false,
  templateUrl: './inventory-history-page.html',
  styleUrl: './inventory-history-page.css',
  providers: [InventoryHistoryStateService]
})
export class InventoryHistoryPage {
  public readonly stateService = inject(InventoryHistoryStateService);
  public readonly tableConfig: TableConfig = {
    columns: [
      {
        headerName: 'Timestamp',
        dataProperty: 'timestamp',
        highlighted: false,
        noWrap: true,
        columnType: 'date',
        sortable: true,
      },
      {
        headerName: 'Operation',
        dataProperty: 'operationName',
        highlighted: false,
        noWrap: true,
        columnType: 'label',
        sortable: true,
        cssClasses: (data: InventoryHistory) => {
          if (data.operationType == InventoryOperationType.Inbound) {
            return 'badge badge-soft badge-success';
          } else if (data.operationType == InventoryOperationType.Outbound) {
            return 'badge badge-soft badge-error';
          } else {
            return 'badge badge-soft badge-info';
          }
        }
      },
      {
        headerName: 'Product Name',
        dataProperty: 'productName',
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
        headerName: 'Area',
        dataProperty: 'area',
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
        columnType: 'text',
        sortable: false,
        textFormat: (data: InventoryHistory) => {
          if (data.afterQuantity > data.beforeQuantity) {
            return `+${data.quantity.toLocaleString(DEFAULT_LOCALE)}`;
          } else if (data.afterQuantity < data.beforeQuantity) {
            return `-${data.quantity.toLocaleString(DEFAULT_LOCALE)}`;
          } else {
            return data.quantity.toLocaleString(DEFAULT_LOCALE);
          }
        },
        cssClasses: (data: InventoryHistory) => {
          if (data.afterQuantity > data.beforeQuantity) {
            return 'text-success';
          } else if (data.afterQuantity < data.beforeQuantity) {
            return 'text-error';
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'Before',
        dataProperty: 'beforeQuantity',
        highlighted: false,
        noWrap: true,
        columnType: 'number',
        sortable: false,
      },
      {
        headerName: 'After',
        dataProperty: 'afterQuantity',
        highlighted: false,
        noWrap: true,
        columnType: 'number',
        sortable: false,
      },
    ],
  }
  public readonly operationTypes: KeyValue<string, string>[] = [
    { key: '', value: 'All' },
    { key: InventoryOperationType.Inbound.toString(), value: 'Inbound' },
    { key: InventoryOperationType.Outbound.toString(), value: 'Outbound' },
    { key: InventoryOperationType.Adjustment.toString(), value: 'Adjustment' },
    { key: InventoryOperationType.MoveArea.toString(), value: 'Move Area' },
  ];

  public onPageSizeChanged(newPageSize: number): void {
    if (newPageSize === this.stateService.selectedPageSize()) return;

    this.stateService.loadInventoryHistories({ pageSize: newPageSize });
  }

  public onFirstPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  public onPreviousPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  public onNextPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  public onLastPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  public onSearchTermChanged(newSearchTerm: string): void {
    if (newSearchTerm === this.stateService.searchTerm()) return;

    this.stateService.loadInventoryHistories({ query: newSearchTerm });
  }

  public onSearchOperationTypeChanged(newSearchOperation: string): void {
    const operationType = newSearchOperation ? Number(newSearchOperation) : null;
    if (operationType === this.stateService.selectedOperationType()) return;

    this.stateService.loadInventoryHistories({ operationType: operationType });
  }

  public onSortChanged(newSort: TableSortState): void {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
      newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.loadInventoryHistories({ sort: newSort });
  }

  public onDateRangeChange(newDateRange: DateRange): void {
    if (newDateRange.startDate === this.stateService.selectedDateRange().startDate &&
      newDateRange.endDate === this.stateService.selectedDateRange().endDate) return;

    this.stateService.loadInventoryHistories({ dateRange: newDateRange });
  }
}
