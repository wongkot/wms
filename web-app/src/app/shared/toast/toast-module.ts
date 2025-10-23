import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '@app/shared/toast/components/toast-component/toast-component';

@NgModule({
  declarations: [
    ToastComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
  ]
})
export class ToastModule { }
