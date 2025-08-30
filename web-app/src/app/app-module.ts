import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app';
import { AppRoutingModule } from '@app/app-routing-module';
import { CoreModule } from '@app/core/core-module';
import { MessageDialogModule } from '@app/shared/message-dialog/message-dialog-module';
import { ToastModule } from '@app/shared/toast/toast-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ToastModule,
    MessageDialogModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
