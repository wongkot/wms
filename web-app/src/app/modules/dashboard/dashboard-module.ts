import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from '@app/shared/chart/chart-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: DashboardPage },
];

@NgModule({
  declarations: [
    DashboardPage
  ],
  imports: [
    CommonModule,
    ChartModule,
    TableModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class DashboardModule { }
