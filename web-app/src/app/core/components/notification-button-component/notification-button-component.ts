import { Component, inject, input } from '@angular/core';
import { ProductQuantityChangedNotification } from '@app/core/models/product-quantity-changed-notification';
import { NotificationService } from '@app/core/services/state/notification-service';

@Component({
  selector: 'app-notification-button',
  standalone: false,
  templateUrl: './notification-button-component.html',
  styleUrl: './notification-button-component.css'
})
export class NotificationButtonComponent {
  public readonly largeButtonSize = input<boolean>(false);
  public readonly notificationService = inject(NotificationService);

  public onNotificationClick(notification: ProductQuantityChangedNotification): void {
    this.notificationService.markAsRead(notification);
  }

  public onClearAllClick(): void {
    this.notificationService.clearAll();
  }

  public onNotificationButtonFocused(): void {
    this.notificationService.refreshDate();
  }
}
