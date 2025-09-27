import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './pages/dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from '@app/shared/chart/chart-module';
import { TableModule } from '@app/shared/table/table-module';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: Dashboard },
];

@NgModule({
  declarations: [
    Dashboard
  ],
  imports: [
    CommonModule,
    ChartModule,
    TableModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class DashboardModule { }
