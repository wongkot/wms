import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '@app/core/components/nav-bar/nav-bar';
import { RouterModule } from '@angular/router';
import { ThemeButtonComponent } from '@app/core/components/theme-button-component/theme-button-component';
import { NotificationButtonComponent } from '@app/core/components/notification-button-component/notification-button-component';
import { TimeAgoPipe } from './pipes/time-ago-pipe';

@NgModule({
  declarations: [
    NavBar,
    ThemeButtonComponent,
    NotificationButtonComponent,
    TimeAgoPipe
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
