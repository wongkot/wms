import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryHistoryPage } from '@app/modules/inventory-history/pages/inventory-history-page/inventory-history-page';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarModule } from '@app/shared/search-bar/search-bar-module';
import { DropdownModule } from '@app/shared/dropdown/dropdown-module';
import { TableModule } from '@app/shared/table/table-module';
import { PaginationModule } from '@app/shared/pagination/pagination-module';
import { DatePickerModule } from '@app/shared/date-picker/date-picker-module';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: InventoryHistoryPage },
];

@NgModule({
  declarations: [
    InventoryHistoryPage
  ],
  imports: [
    CommonModule,
    SearchBarModule,
    DropdownModule,
    TableModule,
    PaginationModule,
    DatePickerModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class InventoryHistoryModule { }
