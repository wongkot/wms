import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './pages/dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{ path: '', pathMatch: 'full', component: Dashboard },
];

@NgModule({
  declarations: [
    Dashboard
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class DashboardModule { }
