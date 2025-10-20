import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '@app/core/services/data/utility-service';
import { InventoryStatus } from '@app/modules/inventory/enums/inventory-status';
import { InventoryProduct } from '@app/modules/inventory/models/inventory-product';
import { InventoryManagementStateService } from '@app/modules/inventory/services/state/inventory-management-state-service';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';

@Component({
  selector: 'app-inventory-management',
  standalone: false,
  templateUrl: './inventory-management-page.html',
  styleUrl: './inventory-management-page.css',
  providers: [InventoryManagementStateService],
})
export class InventoryManagementPage {
  private readonly _routerService = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _utilityService = inject(UtilityService);
  public readonly stateService = inject(InventoryManagementStateService);
  public readonly tableConfig: TableConfig = {
    canViewDetail: true,
    columns: [
      {
        headerName: 'Image',
        dataProperty: 'imageUrl',
        highlighted: false,
        noWrap: true,
        columnType: 'image',
        sortable: false,
      },
      {
        headerName: 'Product Name',
        dataProperty: 'productName',
        highlighted: true,
        noWrap: true,
        columnType: 'text',
        sortable: true,
      },
      {
        headerName: 'Category',
        dataProperty: 'category',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
        sortable: true,
      },
      {
        headerName: 'Status',
        dataProperty: 'inventoryStatusName',
        highlighted: false,
        noWrap: true,
        columnType: 'label',
        sortable: true,
        cssClasses: (data: InventoryProduct) => {
          if (data.inventoryStatus == InventoryStatus.Low) {
            return 'badge badge-soft badge-warning';
          } else if (data.inventoryStatus == InventoryStatus.OutOfStock) {
            return 'badge badge-soft badge-error';
          } else {
            return 'badge badge-soft badge-success';
          }
        }
      },
      {
        headerName: 'On Hand',
        dataProperty: 'quantity',
        highlighted: false,
        noWrap: true,
        columnType: 'number',
        sortable: true,
      },
      {
        headerName: 'Unit Price',
        dataProperty: 'unitPrice',
        highlighted: false,
        noWrap: true,
        columnType: 'price',
        sortable: true,
      },
      {
        headerName: 'Total Price',
        dataProperty: 'totalPrice',
        highlighted: false,
        noWrap: true,
        columnType: 'price',
        sortable: true,
      },
    ],
  }
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown();

  public onPageSizeChanged(newPageSize: number): void {
    if (newPageSize === this.stateService.selectedPageSize()) return;

    this.stateService.loadInventoryProducts({ pageSize: newPageSize });
  }

  public onFirstPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryProducts({ page: newPage });
  }

  public onPreviousPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryProducts({ page: newPage });
  }

  public onNextPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryProducts({ page: newPage });
  }

  public onLastPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadInventoryProducts({ page: newPage });
  }

  public onSearchTermChanged(newSearchTerm: string): void {
    if (newSearchTerm === this.stateService.searchTerm()) return;

    this.stateService.loadInventoryProducts({ query: newSearchTerm });
  }

  public onSearchCategoryChanged(newSearchCategory: string): void {
    if (newSearchCategory === this.stateService.selectedCategory()) return;

    this.stateService.loadInventoryProducts({ category: newSearchCategory });
  }

  public onSortChanged(newSort: TableSortState): void {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
      newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.loadInventoryProducts({ sort: newSort });
  }

  public onInboundInventory(): void {
    this._routerService.navigate(['inbound'], { relativeTo: this._route });
  }

  public onViewInventoryProductDetail(product: InventoryProduct): void {
    this._routerService.navigate(['detail', product.productId], { relativeTo: this._route });
  }
}
