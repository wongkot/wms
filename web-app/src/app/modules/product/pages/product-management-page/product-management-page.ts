import { KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductManagementStateService } from '@app/modules/product/services/state/product-management-state-service';
import { TableConfig } from '@app/shared/table/models/table-config';
import { TableSortState } from '@app/shared/table/models/table-sort-state';

@Component({
  selector: 'app-product-management',
  standalone: false,
  templateUrl: './product-management-page.html',
  styleUrl: './product-management-page.css',
  providers: [ProductManagementStateService]
})
export class ProductManagementPage {
  public stateService: ProductManagementStateService;
  private _routerService = inject(Router);
  private _route = inject(ActivatedRoute);

  public readonly tableConfig: TableConfig = {
    canEdit: true,
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
  public readonly productCategories: KeyValue<string, string>[] = [
    { key: '', value: 'None' },
    { key: 'Smart Watches', value: 'Smart Watches' },
    { key: 'PC', value: 'PC' },
    { key: 'Smart Phones', value: 'Smart Phones' },
  ]

  constructor() { 
    this.stateService = inject(ProductManagementStateService);
  }

  onPageSizeChanged(newPageSize: number) {
    if (newPageSize === this.stateService.selectedPageSize()) return;

    this.stateService.loadProducts(this.stateService.selectedPage(), newPageSize, this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onFirstPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onPreviousPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onNextPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onLastPageClick(newPage: number) {
    if (newPage === this.stateService.selectedPage()) return;

    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onSearchTermChanged(newSearchTerm: string) {
    if (newSearchTerm === this.stateService.searchTerm()) return;

    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), newSearchTerm, this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onSearchCategoryChanged(newSearchCategory: string) {
    if (newSearchCategory === this.stateService.selectedCategory()) return;

    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), this.stateService.searchTerm(), newSearchCategory, this.stateService.currentSortState());
  }

  onSortChanged(newSort: TableSortState) {
    if (newSort.columnProp === this.stateService.currentSortState().columnProp &&
        newSort.isAsc === this.stateService.currentSortState().isAsc) return;

    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), newSort);
  }

  onAddProduct() {
    this._routerService.navigate(['add'], { relativeTo: this._route });
  }
}
