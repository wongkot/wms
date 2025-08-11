import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagement } from './pages/product-management/product-management';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: ProductManagement },
];

@NgModule({
  declarations: [
    ProductManagement
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
