import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from '@app/core/pages/not-found-page/not-found-page';

const routes: Routes = [
  { path: 'product', loadChildren: () => import('@app/modules/product/product-module').then(m => m.ProductModule) },
  { path: 'inventory', loadChildren: () => import('@app/modules/inventory/inventory-module').then(m => m.InventoryModule) },
  { path: 'history', loadChildren: () => import('@app/modules/inventory-history/inventory-history-module').then(m => m.InventoryHistoryModule) },
  { path: '', pathMatch: 'full', loadChildren: () => import('@app/modules/dashboard/dashboard-module').then(m => m.DashboardModule) },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
