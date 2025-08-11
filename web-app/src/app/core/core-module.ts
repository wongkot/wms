import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '@app/core/components/nav-bar/nav-bar';

@NgModule({
  declarations: [
    NavBar
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBar,
  ]
})
export class CoreModule { }
