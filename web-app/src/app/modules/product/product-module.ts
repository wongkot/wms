import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementPage } from '@app/modules/product/pages/product-management-page/product-management-page';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: ProductManagementPage },
];

@NgModule({
  declarations: [
    ProductManagementPage
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginationModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
