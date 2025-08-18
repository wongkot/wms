import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddPage } from '@app/modules/product/pages/product-add-page/product-add-page';
import { ProductManagementPage } from '@app/modules/product/pages/product-management-page/product-management-page';
import { ButtonModule } from '@app/shared/button/button-module';
import { DropdownModule } from '@app/shared/dropdown/dropdown-module';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { SearchBarModule } from '@app/shared/search-bar/search-bar-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: ProductManagementPage },
	{ path: 'add', pathMatch: 'full', component: ProductAddPage },
];

@NgModule({
  declarations: [
    ProductManagementPage,
    ProductAddPage
  ],
  imports: [
    CommonModule,
    TableModule,
    SearchBarModule,
    PaginationModule,
    DropdownModule,
    ButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
