import { KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
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
    { key: '', value: 'Choose Category' },
    { key: 'Smart Watches', value: 'Smart Watches' },
    { key: 'PC', value: 'PC' },
    { key: 'Smart Phones', value: 'Smart Phones' },
  ]

  constructor() { 
    this.stateService = inject(ProductManagementStateService);
  }

  onPageSizeChanged(newPageSize: number) {
    this.stateService.loadProducts(this.stateService.selectedPage(), newPageSize, this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onFirstPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onPreviousPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onNextPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onLastPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onSearchTermChanged(newSearchTerm: string) {
    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), newSearchTerm, this.stateService.selectedCategory(), this.stateService.currentSortState());
  }

  onSearchCategoryChanged(newSearchCategory: string) {
    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), this.stateService.searchTerm(), newSearchCategory, this.stateService.currentSortState());
  }

  onSortChanged(newSort: TableSortState) {
    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory(), newSort);
  }
}
