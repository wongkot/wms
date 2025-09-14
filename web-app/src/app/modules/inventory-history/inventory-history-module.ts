import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryHistoryPage } from '@app/modules/inventory-history/pages/inventory-history-page/inventory-history-page';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: InventoryHistoryPage },
];

@NgModule({
  declarations: [
    InventoryHistoryPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class InventoryHistoryModule { }
