import { Component, inject } from '@angular/core';
import { ToastService } from '@app/shared/toast/services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css'
})
export class ToastComponent {
  public toastService = inject(ToastService);

  onClose() {
    this.toastService.close();
  }
}
