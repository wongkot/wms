import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryDetailPage } from '@app/modules/inventory/pages/inventory-detail-page/inventory-detail-page';
import { InventoryManagementPage } from '@app/modules/inventory/pages/inventory-management-page/inventory-management-page';
import { ButtonModule } from '@app/shared/button/button-module';
import { DropdownModule } from '@app/shared/dropdown/dropdown-module';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { SearchBarModule } from '@app/shared/search-bar/search-bar-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: InventoryManagementPage },
  { path: 'detail/:product-id', component: InventoryDetailPage },
];

@NgModule({
  declarations: [
    InventoryManagementPage,
    InventoryDetailPage
  ],
  imports: [
    CommonModule,
    TableModule,
    SearchBarModule,
    PaginationModule,
    DropdownModule,
    ButtonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class InventoryModule { }
