import { Component, inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MESSAGES } from '@app/core/constants/app';
import { UtilityService } from '@app/core/services/data/utility-service';
import { Product } from '@app/modules/product/models/product';
import { ProductManagementStateService } from '@app/modules/product/services/state/product-management-state-service';
import { DialogResult } from '@app/shared/message-dialog/enums/dialog-result';
import { MessageDialogService } from '@app/shared/message-dialog/services/message-dialog-service';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';
import { ToastService } from '@app/shared/toast/services/toast-service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-management',
  standalone: false,
  templateUrl: './product-management-page.html',
  styleUrl: './product-management-page.css',
  providers: [ProductManagementStateService]
})
export class ProductManagementPage implements OnDestroy {
  private readonly _routerService = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _messageDialogService = inject(MessageDialogService);
  private readonly _toastService = inject(ToastService);
  private _deleteProductSuccess: Subscription;
  private readonly _utilityService = inject(UtilityService);
  public readonly stateService = inject(ProductManagementStateService);
  public readonly tableConfig: TableConfig = {
    canEdit: true,
    canDelete: true,
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
        dataProperty: 'name',
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
        headerName: 'Description',
        dataProperty: 'description',
        highlighted: false,
        noWrap: true,
        columnType: 'text',
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
    ],
  }
  public readonly productCategories = this._utilityService.getProductCategoriesForDropdown();

  constructor() {
    this._deleteProductSuccess = this.stateService.deleteSuccess$.subscribe({
      next: () => {
        this._toastService.showSuccess(MESSAGES.PRODUCT_DELETED);
      }
    });
  }

  public onPageSizeChanged(newPageSize: number): void {
    if (newPageSize === this.stateService.selectedPageSize()) return;

    this.stateService.loadProducts({ pageSize: newPageSize });
  }

  public onFirstPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts({ page: newPage });
  }

  public onPreviousPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts({ page: newPage });
  }

  public onNextPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts({ page: newPage });
  }

  public onLastPageClick(newPage: number): void {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts({ page: newPage });
  }

  public onSearchTermChanged(newSearchTerm: string): void {
    if (newSearchTerm === this.stateService.searchTerm()) return;

    this.stateService.loadProducts({ query: newSearchTerm });
  }

  public onSearchCategoryChanged(newSearchCategory: string): void {
    if (newSearchCategory === this.stateService.selectedCategory()) return;

    this.stateService.loadProducts({ category: newSearchCategory });
  }

  public onSortChanged(newSort: TableSortState): void {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
      newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.loadProducts({ sort: newSort });
  }

  public onAddProduct(): void {
    this._routerService.navigate(['add'], { relativeTo: this._route });
  }

  public onEditProduct(product: Product): void {
    this._routerService.navigate(['edit', product.id], { relativeTo: this._route });
  }

  public onDeleteProduct(product: Product): void {
    this._messageDialogService.showError('Confirmation', MESSAGES.CONFIRM_DELETE_PRODUCT).pipe(
      filter((result) => result == DialogResult.OK)
    )
      .subscribe(() => {
        this.stateService.deleteProduct(product.id);
      });
  }

  public ngOnDestroy(): void {
    if (this._deleteProductSuccess) {
      this._deleteProductSuccess.unsubscribe();
    }
  }
}
