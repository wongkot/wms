import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '@app/core/components/nav-bar-component/nav-bar-component';
import { RouterModule } from '@angular/router';
import { ThemeButtonComponent } from '@app/core/components/theme-button-component/theme-button-component';
import { NotificationButtonComponent } from '@app/core/components/notification-button-component/notification-button-component';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

@NgModule({
  declarations: [
    NavBarComponent,
    ThemeButtonComponent,
    NotificationButtonComponent,
    TimeAgoPipe,
    NotFoundPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    NavBarComponent,
    NotFoundPage,
  ]
})
export class CoreModule { }
