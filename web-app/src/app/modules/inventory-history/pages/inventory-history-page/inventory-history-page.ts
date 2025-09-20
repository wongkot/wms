import { KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  providers: [ InventoryHistoryStateService ]
})
export class InventoryHistoryPage {
  public stateService: InventoryHistoryStateService;
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
            return `+${data.quantity.toLocaleString('en-US')}`;
          } else if (data.afterQuantity < data.beforeQuantity) {
            return `-${data.quantity.toLocaleString('en-US')}`;
          } else {
            return data.quantity.toLocaleString('en-US');
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

  constructor() {
    this.stateService = inject(InventoryHistoryStateService);
  }

  onPageSizeChanged(newPageSize: number) {
    if (newPageSize === this.stateService.selectedPageSize()) return;

    this.stateService.loadInventoryHistories({ pageSize: newPageSize });
  }

  onFirstPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  onPreviousPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  onNextPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  onLastPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryHistories({ page: newPage });
  }

  onSearchTermChanged(newSearchTerm: string) {
    if (newSearchTerm === this.stateService.searchTerm()) return;

    this.stateService.loadInventoryHistories({ query: newSearchTerm });
  }

  onSearchOperationTypeChanged(newSearchOperation: string) {
    const operationType = newSearchOperation ? Number(newSearchOperation) : null;
    if (operationType === this.stateService.selectedOperationType()) return;

    this.stateService.loadInventoryHistories({ operationType: operationType });
  }

  onSortChanged(newSort: TableSortState) {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
      newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.loadInventoryHistories({ sort: newSort });
  }

  onDateRangeChange(newDateRange: DateRange) {
    if (newDateRange.startDate === this.stateService.selectedDateRange().startDate &&
      newDateRange.endDate === this.stateService.selectedDateRange().endDate) return;

    this.stateService.loadInventoryHistories({ dateRange: newDateRange });
  }
}
