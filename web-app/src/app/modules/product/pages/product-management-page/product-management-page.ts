import { Component, inject } from '@angular/core';
import { ProductManagementStateService } from '@app/modules/product/services/state/product-management-state-service';
import { TableConfig } from '@app/shared/table/models/table-config';

@Component({
  selector: 'app-product-management',
  standalone: false,
  templateUrl: './product-management-page.html',
  styleUrl: './product-management-page.css'
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

  constructor() { 
    this.stateService = inject(ProductManagementStateService);
  }
}
