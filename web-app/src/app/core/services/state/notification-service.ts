import { computed, Injectable, signal } from '@angular/core';
import { ProductQuantityChangedNotification } from '@app/core/models/product-quantity-changed-notification';

@Injectable({
  'providedIn': 'root'
})
export class NotificationService {
  private readonly _maxNotifications = 5;
  private readonly _currentNotifications = signal<ProductQuantityChangedNotification[]>([]);
  public readonly hasUnreadNotification = computed(() => {
    return this._currentNotifications().some(notification => !notification.read);
  })

  public get currentNotifications() {
    return this._currentNotifications.asReadonly();
  }

  public notify(notification: ProductQuantityChangedNotification, delay: number = 500): void {
    const currentNotifications = this._currentNotifications();
    if (currentNotifications.length >= this._maxNotifications) {
      currentNotifications.pop();
    }
    currentNotifications.unshift(notification);

    if (delay > 0) {
      setTimeout(() => {
        this._currentNotifications.set([...currentNotifications]);
      }, delay);
    } else {
      this._currentNotifications.set([...currentNotifications]);
    }
  }

  public markAsRead(notification: ProductQuantityChangedNotification): void {
    if (notification.read) {
      return;
    }
    notification.read = true;

    this._currentNotifications.update(previous => [...previous]);
  }

  public clearAll(): void {
    this._currentNotifications.set([]);
  }

  public refreshDate(): void {
    // Update date object to retrigger time ago pipe
    const notifications = this._currentNotifications();
    notifications.forEach(notificaiton => {
      notificaiton.timestamp = new Date(notificaiton.timestamp);
    });
    this._currentNotifications.set([...notifications]);
  }
}
