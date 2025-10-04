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
  largeButtonSize = input<boolean>(false);
  notificationService = inject(NotificationService);

  onNotificationClick(notification: ProductQuantityChangedNotification) {
    this.notificationService.markAsRead(notification);
  }

  onClearAllClick() {
    this.notificationService.clearAll();
  }

  onNotificationButtonFocused() {
    this.notificationService.refreshDate();
  }
}
