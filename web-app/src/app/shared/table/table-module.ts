import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@app/shared/table/components/table-component/table-component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
  ]
})
export class TableModule { }
