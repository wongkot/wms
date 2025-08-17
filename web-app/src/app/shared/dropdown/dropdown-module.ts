import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '@app/shared/dropdown/components/dropdown-component/dropdown-component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    DropdownComponent,
  ]
})
export class DropdownModule { }
