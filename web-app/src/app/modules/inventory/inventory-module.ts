import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryManagementPage } from '@app/modules/inventory/pages/inventory-management-page/inventory-management-page';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: InventoryManagementPage },
];

@NgModule({
  declarations: [
    InventoryManagementPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class InventoryModule { }
