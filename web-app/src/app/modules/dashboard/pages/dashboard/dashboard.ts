import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardStateService } from '@app/modules/dashboard/services/state/dashboard-state-service';
import { InventoryOperationType } from '@app/modules/inventory-history/enums/inventory-operation-type';
import { InventoryHistory } from '@app/modules/inventory-history/models/inventory-history';
import { BaseChartInput } from '@app/shared/chart/models/base-chart-input';
import { TableConfig } from '@app/shared/table/models/table-config';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [ DashboardStateService ]
})
export class Dashboard {
  public stateService: DashboardStateService;
  private _routerService = inject(Router);

  constructor() {
    this.stateService = inject(DashboardStateService);
  }

  public readonly tableConfig: TableConfig = {
    sharpCornerTopLeft: true,
    sharpCornerTopRight: true,
    columns: [
      {
        headerName: 'Timestamp',
        dataProperty: 'timestamp',
        highlighted: false,
        noWrap: true,
        columnType: 'date',
        sortable: false,
      },
      {
        headerName: 'Operation',
        dataProperty: 'operationName',
        highlighted: false,
        noWrap: true,
        columnType: 'label',
        sortable: false,
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
        sortable: false,
      },
      {
        headerName: 'Lot',
        dataProperty: 'lot',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
        sortable: false,
      },
      {
        headerName: 'Area',
        dataProperty: 'area',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
        sortable: false,
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
  };

  onGoToInventoryMenuClick() {
    this._routerService.navigate(['inventory']);
  }
}
