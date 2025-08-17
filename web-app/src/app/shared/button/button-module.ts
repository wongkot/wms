import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from '@app/shared/button/components/button-icon-component/button-icon-component';

@NgModule({
  declarations: [
    ButtonIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonIconComponent,
  ]
})
export class ButtonModule { }
