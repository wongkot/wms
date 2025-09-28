import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '@app/core/components/nav-bar/nav-bar';
import { RouterModule } from '@angular/router';
import { ThemeButtonComponent } from '@app/core/components/theme-button-component/theme-button-component';

@NgModule({
  declarations: [
    NavBar,
    ThemeButtonComponent
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
