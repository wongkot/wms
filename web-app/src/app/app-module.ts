import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app';
import { AppRoutingModule } from '@app/app-routing-module';
import { DATE_TIME_FORMAT } from '@app/core/constants/app';
import { CoreModule } from '@app/core/core-module';
import { MessageDialogModule } from '@app/shared/message-dialog/message-dialog-module';
import { ToastModule } from '@app/shared/toast/toast-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    ToastModule,
    MessageDialogModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: DATE_TIME_FORMAT } }
  ],
  bootstrap: [App]
})
export class AppModule { }
