import { KeyValue } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductManagementStateService } from '@app/modules/product/services/state/product-management-state-service';
import { TableConfig } from '@app/shared/table/models/table-config';

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
        columnType: 'image'
      },
      {
        headerName: 'Product Name',
        dataProperty: 'name',
        highlighted: true,
        noWrap: true,
        columnType: 'text'
      },
      {
        headerName: 'Category',
        dataProperty: 'category',
        highlighted: false,
        noWrap: true,
        columnType: 'text'
      },
      {
        headerName: 'Description',
        dataProperty: 'description',
        highlighted: false,
        noWrap: true,
        columnType: 'text'
      },
      {
        headerName: 'Unit Price',
        dataProperty: 'unitPrice',
        highlighted: false,
        noWrap: true,
        columnType: 'price'
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
    this.stateService.loadProducts(this.stateService.selectedPage(), newPageSize, this.stateService.searchTerm(), this.stateService.selectedCategory());
  }

  onFirstPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory());
  }

  onPreviousPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory());
  }

  onNextPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory());
  }

  onLastPageClick(newPage: number) {
    this.stateService.loadProducts(newPage, this.stateService.selectedPageSize(), this.stateService.searchTerm(), this.stateService.selectedCategory());
  }

  onSearchTermChanged(newSearchTerm: string) {
    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), newSearchTerm, this.stateService.selectedCategory());
  }

  onSearchCategoryChanged(newSearchCategory: string) {
    this.stateService.loadProducts(this.stateService.selectedPage(), this.stateService.selectedPageSize(), this.stateService.searchTerm(), newSearchCategory);
  }
}
