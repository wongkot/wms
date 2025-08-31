import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementPage } from '@app/modules/inventory/pages/inventory-management-page/inventory-management-page';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@app/shared/button/button-module';
import { DropdownModule } from '@app/shared/dropdown/dropdown-module';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { SearchBarModule } from '@app/shared/search-bar/search-bar-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: InventoryManagementPage },
];

@NgModule({
  declarations: [
    InventoryManagementPage
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
