import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css'
})
export class AlertComponent {
  message = input<string>();
  type = input<'info' | 'success' | 'warning' | 'error'>('info')
  dismissClick = output<void>();
  alertStyle = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'info':
      default:
        return 'alert-info';
    }
  });
  alertButtonStyle = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'btn-success';
      case 'warning':
        return 'btn-warning';
      case 'error':
        return 'btn-error';
      case 'info':
      default:
        return 'btn-info';
    }
  });

  onDismissClick() {
    this.dismissClick.emit();
  }
}
