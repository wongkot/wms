import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'product', loadChildren: () => import('@app/modules/product/product-module').then(m => m.ProductModule) },
  { path: '', pathMatch: 'full', loadChildren: () => import('@app/modules/dashboard/dashboard-module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
