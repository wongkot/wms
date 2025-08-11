import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '@app/core/components/nav-bar/nav-bar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBar
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    NavBar,
  ]
})
export class CoreModule { }
