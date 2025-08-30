import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from '@app/shared/message-dialog/components/message-dialog-component/message-dialog-component';
import { MessageDialogService } from '@app/shared/message-dialog/services/message-dialog-service';

@NgModule({
  declarations: [
    MessageDialogComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MessageDialogService
  ]
})
export class MessageDialogModule { }
