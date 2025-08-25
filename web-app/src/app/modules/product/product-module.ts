import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddPage } from '@app/modules/product/pages/product-add-page/product-add-page';
import { ProductEditPage } from '@app/modules/product/pages/product-edit-page/product-edit-page';
import { ProductManagementPage } from '@app/modules/product/pages/product-management-page/product-management-page';
import { BreadcrumbModule } from '@app/shared/breadcrumb/breadcrumb-module';
import { ButtonModule } from '@app/shared/button/button-module';
import { DataInputModule } from '@app/shared/data-input/data-input-module';
import { DropdownModule } from '@app/shared/dropdown/dropdown-module';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { SearchBarModule } from '@app/shared/search-bar/search-bar-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: ProductManagementPage },
	{ path: 'add', component: ProductAddPage },
	{ path: 'edit/:id', component: ProductEditPage },
];

@NgModule({
  declarations: [
    ProductManagementPage,
    ProductAddPage,
    ProductEditPage,
  ],
  imports: [
    CommonModule,
    TableModule,
    SearchBarModule,
    PaginationModule,
    DropdownModule,
    ButtonModule,
    BreadcrumbModule,
    DataInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
